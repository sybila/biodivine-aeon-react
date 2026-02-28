import useRegulationsStore from '../../../../stores/LiveModel/RegulationsStore/useRegulationsStore';
import useVariablesStore from '../../../../stores/LiveModel/VariablesStore/useVariablesStore';
import { EdgeMonotonicity, type Regulation } from '../../../../types';
import type { LiveModelClass } from '../LiveModel';
import type { RegulationsLMInt } from './RegulationsLMInt';

class RegulationsLM implements RegulationsLMInt {
  // #region --- Properties + Constructor ---

  private liveModel: LiveModelClass;

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

  constructor(liveModel: LiveModelClass) {
    this.liveModel = liveModel;
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
    regulatorId: number,
    targetId: number,
    isObservable: boolean,
    monotonicity: EdgeMonotonicity
  ): boolean | void {
    if (!modAllowed && !this.liveModel.modelCanBeModified()) return;

    if (useRegulationsStore.getState().getRegulationId(regulatorId, targetId))
      return false;

    const regulation: Regulation = {
      regulator: regulatorId,
      target: targetId,
      observable: isObservable,
      monotonicity: monotonicity,
    };

    useRegulationsStore.getState().addRegulation(regulation);
    this.regulationChanged(regulation);
    return true;
  }

  public removeRegulation(
    regulatorId: number,
    targetId: number,
    force: boolean = false
  ): boolean {
    if (!force && !this.liveModel.modelCanBeModified()) {
      return false;
    }

    const exists = useRegulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);
    if (!exists) return false;

    this.removeFromModelVisualizationFunction(regulatorId, targetId);

    useRegulationsStore.getState().removeRegulation(regulatorId, targetId);
    this.liveModel.Export.saveModel();
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
    const regulation = useRegulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);
    if (regulation && regulation.observable !== isObservable) {
      useRegulationsStore
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

    const regulation = useRegulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);
    if (regulation) {
      useRegulationsStore
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
    const regulation = useRegulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);
    if (regulation && regulation.monotonicity !== monotonicity) {
      useRegulationsStore
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

    const regulation = useRegulationsStore
      .getState()
      .getRegulationId(regulatorId, targetId);
    if (regulation) {
      let next = EdgeMonotonicity.unspecified;
      if (regulation.monotonicity === EdgeMonotonicity.unspecified)
        next = EdgeMonotonicity.activation;
      else if (regulation.monotonicity === EdgeMonotonicity.activation)
        next = EdgeMonotonicity.inhibition;
      useRegulationsStore
        .getState()
        .setMonotonicity(regulatorId, targetId, next);
      this.regulationChanged({ ...regulation, monotonicity: next });
    }
  }

  // #endregion

  // #region --- Regulation formating ---

  public regulationToString(regulation: Regulation): string {
    const regulatorName = useVariablesStore
      .getState()
      .getVariableName(regulation.regulator);
    const targetName = useVariablesStore
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
