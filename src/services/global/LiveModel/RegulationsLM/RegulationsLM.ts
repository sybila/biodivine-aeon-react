import type { RegulationsStatus } from '../../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { UndoRedoState } from '../../../../stores/UndoRedo/UndoRedoState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import { EdgeMonotonicity, type Regulation } from '../../../../types';
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
    modAllowed: boolean,
    addIntoUndoRedo: boolean,
    regulatorId: number,
    targetId: number,
    isObservable: boolean,
    monotonicity: EdgeMonotonicity
  ): boolean | void {
    if (!modAllowed && !this.liveModel.modelCanBeModified()) return;

    if (this.regulationsStore.getState().getRegulationId(regulatorId, targetId))
      return false;

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
      });
    }

    return true;
  }

  public removeRegulation(
    addIntoUndoRedo: boolean,
    regulatorId: number,
    targetId: number,
    force: boolean = false
  ): boolean {
    if (!force && !this.liveModel.modelCanBeModified()) {
      return false;
    }

    const exists = this.regulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);
    if (!exists) return false;

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
      });
    }

    return true;
  }

  public regulationChanged(regulation: Regulation): void {
    this.ensureInModelVisualizationFunction(regulation);

    this.liveModel.UpdateFunctions.validateUpdateFunction(regulation.target);
    this.liveModel.Export.saveModel();
  }

  // #endregion

  // #region --- Observability ---

  public setObservability(
    regulatorId: number,
    targetId: number,
    isObservable: boolean
  ): void {
    const regulation = this.regulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);
    if (regulation && regulation.observable !== isObservable) {
      this.regulationsStore
        .getState()
        .setObservability(regulatorId, targetId, isObservable);
      this.regulationChanged({ ...regulation, observable: isObservable });
    }
  }

  public toggleObservability(
    regulatorId: number,
    targetId: number,
    force: boolean = false
  ): void {
    if (!force && !this.liveModel.modelCanBeModified()) return;

    const regulation = this.regulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);
    if (regulation) {
      this.regulationsStore
        .getState()
        .setObservability(regulatorId, targetId, !regulation.observable);
      this.regulationChanged({
        ...regulation,
        observable: !regulation.observable,
      });
    }
  }

  // #endregion

  // #region --- Monotonicity ---

  public setMonotonicity(
    regulatorId: number,
    targetId: number,
    monotonicity: EdgeMonotonicity
  ): void {
    const regulation = this.regulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);
    if (regulation && regulation.monotonicity !== monotonicity) {
      this.regulationsStore
        .getState()
        .setMonotonicity(regulatorId, targetId, monotonicity);
      this.regulationChanged({ ...regulation, monotonicity: monotonicity });
    }
  }

  public toggleMonotonicity(
    regulatorId: number,
    targetId: number,
    force: boolean = false
  ): void {
    if (!force && !this.liveModel.modelCanBeModified()) return;

    const regulation = this.regulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);
    if (regulation) {
      let next = EdgeMonotonicity.unspecified;
      if (regulation.monotonicity === EdgeMonotonicity.unspecified)
        next = EdgeMonotonicity.activation;
      else if (regulation.monotonicity === EdgeMonotonicity.activation)
        next = EdgeMonotonicity.inhibition;
      this.regulationsStore
        .getState()
        .setMonotonicity(regulatorId, targetId, next);
      this.regulationChanged({ ...regulation, monotonicity: next });
    }
  }

  // #endregion

  // #region --- Regulation formating ---

  public regulationToString(regulation: Regulation): string {
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
