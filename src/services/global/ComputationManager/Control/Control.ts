import type { ControlStatus } from '../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type {
  ComputationStatus,
  ControlComputationParams,
} from '../../../../types/types';
import type { ComputeEngineInt } from '../../ComputeEngine/ComputeEngineInt';
import type { LiveModelInt } from '../../LiveModel/LiveModelInt';
import type { MessageInt } from '../../Message/MessageInt';
import type { ControlInt } from './ControlInt';

class Control implements ControlInt {
  // #region --- Props + Constructor ---

  private messageServ: MessageInt;
  private computeEngine: ComputeEngineInt;
  private getLiveModel: () => LiveModelInt | undefined;

  private controlStore: ZustandStore<ControlStatus>;

  private computationCanStart: (
    model: string | undefined
  ) => asserts model is string;
  private setComputationStatus: (
    warning: string | undefined,
    error: string | undefined,
    computeEngineStatus: string | undefined,
    computationStatus: ComputationStatus | undefined,
    color: string | undefined
  ) => void;

  /** Control computation parameters
   * - minRobustness: Minimum robustness for perturbations in %.
   * - maxSize: Maximum size of a perturbation (max number of perturbed variables).
   * - maxNumberOfResults: Maximum number of perturbations to return. */
  private controlComputationParams: ControlComputationParams = {
    minRobustness: 0.01,
    maxSize: undefined,
    maxNumberOfResults: 1000000,
  };

  constructor(
    messageServ: MessageInt,
    computeEngine: ComputeEngineInt,
    getLiveModelFun: () => LiveModelInt | undefined,
    controlStore: ZustandStore<ControlStatus>,
    computationCanStart: (model: string | undefined) => asserts model is string,
    setComputationStatus: (
      warning: string | undefined,
      error: string | undefined,
      computeEngineStatus: string | undefined,
      computationStatus: ComputationStatus | undefined,
      color: string | undefined
    ) => void
  ) {
    this.messageServ = messageServ;
    this.computeEngine = computeEngine;
    this.getLiveModel = getLiveModelFun;

    this.controlStore = controlStore;

    this.computationCanStart = computationCanStart;
    this.setComputationStatus = setComputationStatus;
  }

  // #endregion

  // #region --- Control Computation Parameters Setters/Getters ---

  public setMaxNumberOfResults(max: number | undefined) {
    if (!max) this.controlComputationParams.maxNumberOfResults = 1000000;
    else if (max < 1) this.controlComputationParams.maxNumberOfResults = 1;
    else this.controlComputationParams.maxNumberOfResults = max;
  }

  public getMaxNumberOfResults() {
    return this.controlComputationParams.maxNumberOfResults;
  }

  public resetMaxSize() {
    this.controlComputationParams.maxSize = undefined;
  }

  public setMaxSize(max: number | undefined) {
    const numberOfEnabled = this.controlStore
      .getState()
      .getNumberOfSetControl()[0];

    if (!max || max > numberOfEnabled) {
      this.controlComputationParams.maxSize = numberOfEnabled;
    } else if (max < 1) {
      this.controlComputationParams.maxSize = 1;
    } else {
      this.controlComputationParams.maxSize = max;
    }
  }

  public getMaxSize() {
    if (this.controlComputationParams.maxSize === undefined) {
      this.controlComputationParams.maxSize = this.controlStore
        .getState()
        .getNumberOfSetControl()[0];
    }

    return this.controlComputationParams.maxSize;
  }

  public setMinRobustness(min: number | undefined) {
    if (!min || min < 0) this.controlComputationParams.minRobustness = 0.01;
    else this.controlComputationParams.minRobustness = min;
  }

  public getMinRobustness() {
    return this.controlComputationParams.minRobustness;
  }

  // #endregion

  // #region --- Control Computation ---

  public startControlComputation() {
    // TODO - change when multiple phenotypes for computation are allowed
    const model = this.getLiveModel()!.Export.exportAeon(
      false,
      this.controlStore.getState().phenotypesUsedInComputation.values().next()
        .value ?? -1
    );

    const oscillation =
      this.getLiveModel()!.Control.getOscillation() ?? 'allowed';
    const phenotypeControlEnabled =
      this.getLiveModel()!.Control.getPhenotypeControlEnabledVars();

    try {
      this.computationCanStart(model);
    } catch (error) {
      if (error instanceof Error) {
        this.messageServ.showError(error.message);
      }

      return;
    }

    this.computeEngine.startControlComputation(
      model,
      oscillation,
      this.getMinRobustness(),
      this.getMaxSize(),
      this.getMaxNumberOfResults(),
      { ...phenotypeControlEnabled, oscillation: oscillation },
      this.setComputationStatus
    );
  }

  // #endregion
}

export default Control;
