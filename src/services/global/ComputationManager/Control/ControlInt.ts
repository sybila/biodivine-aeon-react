export interface ControlInt {
  // #region --- Control Computation Parameters Setters/Getters ---

  /** Sets maximum number of perturbations */
  setMaxNumberOfResults(max: number | undefined): void;

  /** Returns maximum number of perturbations */
  getMaxNumberOfResults(): number;

  /** Resets the maximum size of a perturbation.
   * After calling this, the next call to getMaxSize() will set it to the current number of Control-Enabled variables in the model.
   */
  resetMaxSize(): void;

  /** Sets maximum size of a perturbation */
  setMaxSize(max: number | undefined): void;

  /** Returns maximum size of a perturbation */
  getMaxSize(): number;

  /** Sets minimum robustness for perturbations in %*/
  setMinRobustness(min: number | undefined): void;

  /** Returns minimum robustness for perturbations */
  getMinRobustness(): number;

  // #endregion

  // #region --- Control Computation ---

  startControlComputation(): void;

  // #endregion
}
