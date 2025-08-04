import type {
  AttractorResults,
  ComputationModes,
  ComputationStatus,
  ControlResults,
} from '../../../types';
import ComputeEngine from '../ComputeEngine/External/ComputeEngine';
import { LiveModel } from '../LiveModel/LiveModel';
import useComputeEngineStatus from '../../../stores/ComputationManager/useComputeEngineStatus';
import { Message } from '../../../components/lit-components/message-wrapper';
import useResultsStatus from '../../../stores/ComputationManager/useResultsStatus';

/**
	Responsible for managing computation inside AEON. (start computation, stop computation, computation parameters...)
*/
class ComputationManagerClass {
  // #region --- Properties ---

  /** Currently used compute engine comunicator */
  private computeEngine = new ComputeEngine(this.setResults);

  /** Saves currently set computation mode */
  private computationMode: ComputationModes = 'Attractor Analysis';

  /** Minimum robustness for perturbations */
  private minRobustness: number = 0.01;

  /** Maximum number of variables in a perturbation */
  private maxSize: number = 1000000;

  /** Maximum number of perturbations */
  private maxNumberOfResults: number = 1000000;

  // #endregion

  // #region --- External Compute Engine Adress Setters/Getters ---

  /** Sets the URL of the compute engine */
  public setComputeEngineAddress(address: string): void {
    if (address && this.computeEngine.setEngineAddress)
      this.computeEngine.setEngineAddress(address);
  }

  /** Returns the URL of the compute engine */
  public getComputeEngineAddress(): string | undefined {
    if (this.computeEngine.getEngineAddress)
      return this.computeEngine.getEngineAddress();
  }

  // #endregion

  // #region --- Control Computation Parameters Setters/Getters ---

  /** Sets maximum number of perturbations */
  public setMaxNumberOfResults(max: number | undefined) {
    if (!max) this.maxNumberOfResults = 1000000;
    else if (max < 1) this.maxNumberOfResults = 1;
    else this.maxNumberOfResults = max;
  }

  /** Returns maximum number of perturbations */
  public getMaxNumberOfResults() {
    return this.maxNumberOfResults;
  }

  /** Sets maximum size of a perturbation */
  public setMaxSize(max: number | undefined) {
    if (!max) this.maxSize = 1000000;
    else if (max < 1) this.maxSize = 1;
    else this.maxSize = max;
  }

  /** Returns maximum size of a perturbation */
  public getMaxSize() {
    return this.maxSize;
  }

  /** Sets minimum robustness for perturbations */
  public setMinRobustness(min: number | undefined) {
    if (!min || min < 0) this.minRobustness = 0.01;
    else this.minRobustness = min;
  }

  /** Returns minimum robustness for perturbations */
  public getMinRobustness() {
    return this.minRobustness;
  }

  // #endregion

  // #region --- Computation Mode Setters/Getters ---

  /** Returns currently set computation mode */
  public getComputationMode() {
    return this.computationMode;
  }

  /** Sets computation mode */
  public setComputationMode(mode: ComputationModes) {
    if (mode) this.computationMode = mode;
  }

  // #endregion

  // #region --- Connection Manager ---

  public toggleConnection(): void {
    this.computeEngine.toggleConnection(this.setComputationStatus);
  }

  // #endregion

  // #region --- Computation Status ---

  private computationCanStart(
    model: string | undefined
  ): asserts model is string {
    if (!model) {
      throw new Error('Cannot start computation: Model is empty.');
    }

    this.computeEngine.computationCanStart();

    if (this.computationMode === 'Control') {
      // Todo add control computation errors
    }

    return;
  }

  public setComputationStatus = (
    warning: string | undefined,
    error: string | undefined,
    computeEngineStatus: string | undefined = undefined,
    computationStatus: ComputationStatus | undefined = undefined,
    color: string | undefined = undefined
  ): void => {
    if (computeEngineStatus)
      useComputeEngineStatus
        .getState()
        .setComputeEngineStatus(computeEngineStatus);

    if (computationStatus)
      useComputeEngineStatus.getState().setComputationStatus(computationStatus);

    if (color) useComputeEngineStatus.getState().setStatusColor(color);

    if (error) {
      Message.showError(error);
    }

    if (warning) {
      Message.showInfo(warning);
    }
  };

  // #endregion

  // #region --- Attractor Analysis Computation ---

  public startAttractorAnalysis(): void {
    const model = LiveModel.Export.exportAeon();

    try {
      this.computationCanStart(model);
    } catch (error: any) {
      console.log('Error starting computation:', error.message);
      Message.showError(error.message);
      return;
    }

    // Todo delete old results
    this.computeEngine.startAttractorAnalysis(model, this.setComputationStatus);
  }

  // #endregion

  // #region --- Results ---

  public setResults(
    warning: string | undefined,
    error: string | undefined,
    type: ComputationModes | undefined,
    results: AttractorResults | ControlResults | undefined
  ): void {
    if (type) {
      useResultsStatus.getState().setType(type);
    }

    if (results) {
      useResultsStatus.getState().setResults(results);
    }

    if (error) {
      Message.showError(error);
    }

    if (warning) {
      Message.showInfo(warning);
    }
  }

  // #endregion
}

const ComputationManager: ComputationManagerClass =
  new ComputationManagerClass();

export default ComputationManager;
