import type { ComputationModes } from '../../../types';

/**
	Responsible for managing computation inside AEON. (start computation, stop computation, computation parameters...)
*/
class ComputationManagerClass {
  /** Saves currently set computation mode */
  private computationMode: ComputationModes = 'Attractor Analysis';

  /** Minimum robustness for perturbations */
  private minRobustness: number = 0.01;

  /** Maximum number of varaibles in a perturbation */
  private maxSize: number = 1000000;

  /** Maximum number of perturbations */
  private maxNumberOfResults: number = 1000000;

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

  /** Retutns currently set computation mode */
  public getComputationMode() {
    return this.computationMode;
  }

  /** Sets computation mode */
  public setComputationMode(mode: ComputationModes) {
    if (mode) this.computationMode = mode;
  }
}

const ComputationManager: ComputationManagerClass =
  new ComputationManagerClass();

export default ComputationManager;
