/**
 * Interface for storing and updating model meta-information such as name and description.
 */
export interface InfoLMInt {
  // #region --- Setters ---

  /** Set the model name and trigger UI update */
  setModelName(name: string, force?: boolean): void;

  /** Set the model description and trigger UI update */
  setModelDescription(description: string, force?: boolean): void;

  // #endregion
}
