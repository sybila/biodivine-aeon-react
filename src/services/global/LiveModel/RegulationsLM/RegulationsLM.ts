import type { RegulationsStatus } from '../../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { UndoRedoState } from '../../../../stores/UndoRedo/UndoRedoState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import { err, ok } from '../../../../types/result';
import { EdgeMonotonicity, type Regulation } from '../../../../types/types';
import type { LiveModelInt } from '../LiveModelInt';
import type { RegulationsLMInt } from './RegulationsLMInt';

class RegulationsLM implements RegulationsLMInt {
  // #region --- Properties + Constructor ---

  /** Function which removes regulation from ModelVisualization */
  private removeFromModelVisualizationFunction: (
    regulatorId: number,
    targetId: number
  ) => void = (_: number, __: number) => {
    console.warn(
      'RegulationsLM: No function set to remove regulation from model visualization'
    );
  };

  /** Function which ensures regulation in ModelVisualization */
  private ensureInModelVisualizationFunction: (regulation: Regulation) => void =
    (_: Regulation) => {
      console.warn(
        'RegulationsLM: No function set to ensure regulation in model visualization'
      );
    };

  private liveModel: LiveModelInt;

  private regulationsStore: ZustandStore<RegulationsStatus>;
  private variablesStore: ZustandStore<VariablesStatus>;
  private modelUndoRedoStore: ZustandStore<UndoRedoState>;

  constructor(
    liveModel: LiveModelInt,

    regulationsStore: ZustandStore<RegulationsStatus>,
    variablesStore: ZustandStore<VariablesStatus>,
    modelUndoRedoStore: ZustandStore<UndoRedoState>
  ) {
    this.liveModel = liveModel;

    this.regulationsStore = regulationsStore;
    this.variablesStore = variablesStore;
    this.modelUndoRedoStore = modelUndoRedoStore;
  }

  // #endregion

  // #region --- Setters for Model Visualization functions ---

  public setRemoveFromModelVisualizationFunction(
    func: (regulatorId: number, targetId: number) => void
  ): void {
    if (func != undefined) {
      this.removeFromModelVisualizationFunction = func;
    }
  }

  public setEnsureInModelVisualizationFunction(
    func: (regulation: Regulation) => void
  ): void {
    if (func != undefined) {
      this.ensureInModelVisualizationFunction = func;
    }
  }

  // #endregion

  // #region --- Regulation Actions ---

  public addRegulation(
    force: boolean,
    addIntoUndoRedo: boolean,
    regulatorId: number,
    targetId: number,
    isObservable: boolean,
    monotonicity: EdgeMonotonicity
  ) {
    if (
      this.regulationsStore.getState().getRegulationId(regulatorId, targetId)
    ) {
      return ok(true);
    }

    if (!force && !this.liveModel.modelCanBeModified()) {
      return ok(false);
    }

    const regulation: Regulation = {
      regulator: regulatorId,
      target: targetId,
      observable: isObservable,
      monotonicity: monotonicity,
    };

    this.regulationsStore.getState().addRegulation(regulation);
    this.regulationChanged(regulation);

    if (addIntoUndoRedo) {
      this.modelUndoRedoStore.getState().addOperation({
        undo: () => this.removeRegulation(false, regulatorId, targetId, true),
        redo: () =>
          this.addRegulation(
            false,
            false,
            regulatorId,
            targetId,
            isObservable,
            monotonicity
          ),
        onRedoSuccess: 'Regulation created succesfully.',
        onUndoSuccess: 'Regulation removed succesfully.',
        onRedoFailErrorPrefix: 'Failed to create regulation',
        onUndoFailErrorPrefix: 'Failed to remove regulation',
      });
    }

    return ok(true);
  }

  public removeRegulation(
    addIntoUndoRedo: boolean,
    regulatorId: number,
    targetId: number,
    force: boolean = false
  ) {
    const exists = this.regulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);

    if (!exists) {
      return ok(true);
    }

    if (!force && !this.liveModel.modelCanBeModified()) {
      return ok(false);
    }

    this.removeFromModelVisualizationFunction(regulatorId, targetId);

    this.regulationsStore.getState().removeRegulation(regulatorId, targetId);
    this.liveModel.Export.saveModel();

    if (addIntoUndoRedo) {
      this.modelUndoRedoStore.getState().addOperation({
        undo: () =>
          this.addRegulation(
            false,
            false,
            regulatorId,
            targetId,
            exists.observable,
            exists.monotonicity
          ),
        redo: () => this.removeRegulation(false, regulatorId, targetId, false),
        onRedoSuccess: 'Regulation removed succesfully.',
        onUndoSuccess: 'Regulation created succesfully.',
        onRedoFailErrorPrefix: 'Failed to remove regulation',
        onUndoFailErrorPrefix: 'Failed to create regulation',
      });
    }

    return ok(true);
  }

  public regulationChanged(regulation: Regulation) {
    this.ensureInModelVisualizationFunction(regulation);

    this.liveModel.UpdateFunctions.validateUpdateFunction(regulation.target);
    this.liveModel.Export.saveModel();
  }

  // #endregion

  // #region --- Observability ---

  public setObservability(
    regulatorId: number,
    targetId: number,
    isObservable: boolean,
    addIntoUndoRedo: boolean
  ) {
    const regulation = this.regulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);

    if (!regulation) {
      return err("This regulation doesn't exist.");
    }

    if (regulation.observable !== isObservable) {
      this.regulationsStore
        .getState()
        .setObservability(regulatorId, targetId, isObservable);
      this.regulationChanged({ ...regulation, observable: isObservable });

      if (addIntoUndoRedo) {
        this.modelUndoRedoStore.getState().addOperation({
          undo: () =>
            this.setObservability(
              regulatorId,
              targetId,
              regulation.observable,
              false
            ),
          redo: () =>
            this.setObservability(regulatorId, targetId, isObservable, false),
          onRedoSuccess: `Regulation successfully set as ${isObservable ? '' : 'not '}observable.`,
          onUndoSuccess: `Regulation successfully set back to ${regulation.observable ? '' : 'not '}observable.`,
          onRedoFailErrorPrefix: `Failed to set regulation to ${isObservable ? '' : 'not '}observable`,
          onUndoFailErrorPrefix: `Failed to set regulation back to ${regulation.observable ? '' : 'not '}observable`,
        });
      }
    }

    return ok(true);
  }

  public toggleObservability(
    regulatorId: number,
    targetId: number,
    addIntoUndoRedo: boolean,
    force: boolean = false
  ) {
    if (!force && !this.liveModel.modelCanBeModified()) {
      return ok(false);
    }

    const regulation = this.regulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);

    if (!regulation) {
      return err("This regulation doesn't exist.");
    }

    this.regulationsStore
      .getState()
      .setObservability(regulatorId, targetId, !regulation.observable);

    this.regulationChanged({
      ...regulation,
      observable: !regulation.observable,
    });

    if (addIntoUndoRedo) {
      this.modelUndoRedoStore.getState().addOperation({
        undo: () =>
          this.setObservability(
            regulatorId,
            targetId,
            regulation.observable,
            false
          ),
        redo: () =>
          this.setObservability(
            regulatorId,
            targetId,
            !regulation.observable,
            false
          ),
        onRedoSuccess: `Regulation successfully set as ${!regulation.observable ? '' : 'not '}observable.`,
        onUndoSuccess: `Regulation successfully set back to ${regulation.observable ? '' : 'not '}observable.`,
        onRedoFailErrorPrefix: `Failed to set regulation to ${!regulation.observable ? '' : 'not '}observable`,
        onUndoFailErrorPrefix: `Failed to set regulation back to ${regulation.observable ? '' : 'not '}observable`,
      });
    }

    return ok(true);
  }

  // #endregion

  // #region --- Monotonicity ---

  public setMonotonicity(
    regulatorId: number,
    targetId: number,
    monotonicity: EdgeMonotonicity,
    addIntoUndoRedo: boolean
  ) {
    const regulation = this.regulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);

    if (!regulation) {
      return err("This regulation doesn't exist.");
    }

    if (regulation.monotonicity !== monotonicity) {
      this.regulationsStore
        .getState()
        .setMonotonicity(regulatorId, targetId, monotonicity);

      this.regulationChanged({ ...regulation, monotonicity: monotonicity });

      if (addIntoUndoRedo) {
        this.modelUndoRedoStore.getState().addOperation({
          undo: () =>
            this.setMonotonicity(
              regulatorId,
              targetId,
              regulation.monotonicity,
              false
            ),
          redo: () =>
            this.setMonotonicity(regulatorId, targetId, monotonicity, false),
          onRedoSuccess: `Regulation monotonicity successfully set to ${monotonicity}.`,
          onUndoSuccess: `Regulation monotonicity successfully set back to ${regulation.monotonicity}.`,
          onRedoFailErrorPrefix: `Failed to set regulation monotonicity to ${monotonicity}`,
          onUndoFailErrorPrefix: `Failed to set regulation back monotonicity to ${regulation.monotonicity}`,
        });
      }
    }

    return ok(true);
  }

  public toggleMonotonicity(
    regulatorId: number,
    targetId: number,
    addIntoUndoRedo: boolean,
    force: boolean = false
  ) {
    if (!force && !this.liveModel.modelCanBeModified()) {
      return ok(false);
    }

    const regulation = this.regulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);

    if (!regulation) {
      return err("This regulation doesn't exist.");
    }

    let next = EdgeMonotonicity.unspecified;
    if (regulation.monotonicity === EdgeMonotonicity.unspecified) {
      next = EdgeMonotonicity.activation;
    } else if (regulation.monotonicity === EdgeMonotonicity.activation) {
      next = EdgeMonotonicity.inhibition;
    }

    this.regulationsStore
      .getState()
      .setMonotonicity(regulatorId, targetId, next);

    this.regulationChanged({ ...regulation, monotonicity: next });

    if (addIntoUndoRedo) {
      this.modelUndoRedoStore.getState().addOperation({
        undo: () =>
          this.setMonotonicity(
            regulatorId,
            targetId,
            regulation.monotonicity,
            false
          ),
        redo: () => this.setMonotonicity(regulatorId, targetId, next, false),
        onRedoSuccess: `Regulation monotonicity successfully set to ${next}.`,
        onUndoSuccess: `Regulation monotonicity successfully set back to ${regulation.monotonicity}.`,
        onRedoFailErrorPrefix: `Failed to set regulation monotonicity to ${next}`,
        onUndoFailErrorPrefix: `Failed to set regulation back monotonicity to ${regulation.monotonicity}`,
      });
    }

    return ok(true);
  }

  // #endregion

  // #region --- Regulation formating ---

  public regulationToString(regulation: Regulation) {
    const regulatorName = this.variablesStore
      .getState()
      .getVariableName(regulation.regulator);
    const targetName = this.variablesStore
      .getState()
      .getVariableName(regulation.target);
    let arrow = '-';

    if (regulation.monotonicity === EdgeMonotonicity.unspecified) arrow += '?';
    else if (regulation.monotonicity === EdgeMonotonicity.activation)
      arrow += '>';
    else if (regulation.monotonicity === EdgeMonotonicity.inhibition)
      arrow += '|';

    if (!regulation.observable) arrow += '?';

    return `${regulatorName} ${arrow} ${targetName}`;
  }

  // #endregion
}

export default RegulationsLM;
