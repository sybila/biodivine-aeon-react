import type { Result } from '../../../../types/result';

/**
 * Interface for storing and updating model meta-information such as name and description.
 */
export interface InfoLMInt {
  // #region --- Setters ---

  /** Set the model name and trigger UI update
   * @param name - The new name for the model.
   * @param addIntoUndoRedo - If true, the change will be added to the undo/redo stack.
   * @param force - If true, the change will be applied regardless of any conflicts.
   * @returns A `Result` object indicating the outcome of the operation.
   * - If the operation was successful, returns a `Success` object containing `true`.
   * - If the operation was blocked by another operation, returns a `Success` object containing `false`.
   * - If an error occurs during the process, returns an `Err` object containing an error message.
   */
  setModelName(
    name: string,
    addIntoUndoRedo: boolean,
    force: boolean
  ): Result<boolean>;

  /** Set the model description and trigger UI update
   * @param description - The new description for the model.
   * @param addIntoUndoRedo - If true, the change will be added to the undo/redo stack.
   * @param force - If true, the change will be applied regardless of any conflicts.
   * @returns A `Result` object indicating the outcome of the operation.
   * - If the operation was successful, returns a `Success` object containing `true`.
   * - If the operation was blocked by another operation, returns a `Success` object containing `false`.
   * - If an error occurs during the process, returns an `Err` object containing an error message.
   */
  setModelDescription(
    description: string,
    addIntoUndoRedo: boolean,
    force: boolean
  ): Result<boolean>;

  // #endregion
}
