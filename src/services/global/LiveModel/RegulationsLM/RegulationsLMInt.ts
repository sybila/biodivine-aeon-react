import type { Result } from '../../../../types/result';
import type { EdgeMonotonicity, Regulation } from '../../../../types/types';

/**
 * Interface for managing regulations in the LiveModel.
 */
export interface RegulationsLMInt {
  // #region --- Setters for Model Visualization functions ---

  /** Setter for function which removes regulation from ModelVisualization */
  setRemoveFromModelVisualizationFunction(
    func: (regulatorId: number, targetId: number) => void
  ): void;

  /** Setter for function which ensures regulation in ModelVisualization */
  setEnsureInModelVisualizationFunction(
    func: (regulation: Regulation) => void
  ): void;

  // #endregion

  // #region --- Regulation Actions ---

  /**
   * Creates a new regulation between two variables in the model.
   *
   * @param force - True if the regulation should be created, even if it would be blocked by another operation.
   * @param addIntoUndoRedo - Determines whether the regulation should be added to the undo/redo stack.
   * @param regulatorId - The unique identifier for the source variable in the model.
   * @param targetId - The unique identifier for the regulated variable in the model.
   * @param isObservable - Indicates whether the regulation is observable.
   * @param monotonicity - The monotonicity of the regulation.
   * @returns A `Result` object detailing the outcome of the operation.
   * - If the operation is successful, returns a `Success` object with `true`.
   * - If the operation is blocked, returns a `Success` object with `false`.
   * - If an error occurs, returns an `Err` object containing an error message.
   */
  addRegulation(
    force: boolean,
    addIntoUndoRedo: boolean,
    regulatorId: number,
    targetId: number,
    isObservable: boolean,
    monotonicity: EdgeMonotonicity
  ): Result<boolean>;

  /**
   * Removes regulation between two variables in the model.
   *
   * @param addIntoUndoRedo - Determines whether the regulation should be added to the undo/redo stack.
   * @param regulatorId - The unique identifier for the source variable in the model.
   * @param targetId - The unique identifier for the regulated variable in the model.
   * @param force - True if the regulation should be removed, even if it would be blocked by another operation.
   * @returns A `Result` object detailing the outcome of the operation.
   * - If the operation is successful, returns a `Success` object with `true`.
   * - If the operation is blocked, returns a `Success` object with `false`.
   * - If an error occurs, returns an `Err` object containing an error message.
   */
  removeRegulation(
    addIntoUndoRedo: boolean,
    regulatorId: number,
    targetId: number,
    force?: boolean
  ): Result<boolean>;

  /**
   * Runs operations that should be executed on every regulation change. (e.g., forces revalidation of update functions)
   * @param regulation - The regulation that was updated.
   */
  regulationChanged(regulation: Regulation): void;

  // #endregion

  // #region --- Observability ---

  /**
   * Sets the observability of a regulation.
   *
   * @param regulatorId - The unique identifier of the source variable in the model.
   * @param targetId - The unique identifier of the regulated variable in the model.
   * @param isObservable - The new observability value for the regulation. If true, the regulation will be observable.
   * @param addIntoUndoRedo - Determines whether the regulation should be added to the undo/redo stack.
   * @returns A `Result` object detailing the outcome of the operation.
   * - If the operation is successful, returns a `Success` object with `true`.
   * - If the operation is blocked, returns a `Success` object with `false`.
   * - If an error occurs, returns an `Err` object containing an error message.
   */
  setObservability(
    regulatorId: number,
    targetId: number,
    isObservable: boolean,
    addIntoUndoRedo: boolean
  ): Result<boolean>;

  /**
   * Toggle the observability of a regulation to the oposite value.
   *
   * @param regulatorId - The unique identifier of the source variable in the model.
   * @param targetId - The unique identifier of the regulated variable in the model.
   * @param addIntoUndoRedo - Determines whether the regulation should be added to the undo/redo stack.
   * @param force - True if the operation should run, even if it would be blocked by another operation.
   * @returns A `Result` object detailing the outcome of the operation.
   * - If the operation is successful, returns a `Success` object with `true`.
   * - If the operation is blocked, returns a `Success` object with `false`.
   * - If an error occurs, returns an `Err` object containing an error message.
   */
  toggleObservability(
    regulatorId: number,
    targetId: number,
    addIntoUndoRedo: boolean,
    force?: boolean
  ): Result<boolean>;

  // #endregion

  // #region --- Monotonicity ---

  /**
   * Sets the monotonicity of a regulation.
   *
   * @param regulatorId - The unique identifier of the source variable in the model.
   * @param targetId - The unique identifier of the regulated variable in the model.
   * @param monotonicity - The new monotonicity value for the regulation. ("unspecified" | "activation" | "inhibition")
   * @param addIntoUndoRedo - Determines whether the regulation should be added to the undo/redo stack.
   * @returns A `Result` object detailing the outcome of the operation.
   * - If the operation is successful, returns a `Success` object with `true`.
   * - If the operation is blocked, returns a `Success` object with `false`.
   * - If an error occurs, returns an `Err` object containing an error message.
   */
  setMonotonicity(
    regulatorId: number,
    targetId: number,
    monotonicity: EdgeMonotonicity,
    addIntoUndoRedo: boolean
  ): Result<boolean>;

  /**
   * Toggle the monotonicity of a regulation to the different value.
   *
   * @param regulatorId - The unique identifier of the source variable in the model.
   * @param targetId - The unique identifier of the regulated variable in the model.
   * @param addIntoUndoRedo - Determines whether the regulation should be added to the undo/redo stack.
   * @param force - True if the operation should run, even if it would be blocked by another operation.
   * @returns A `Result` object detailing the outcome of the operation.
   * - If the operation is successful, returns a `Success` object with `true`.
   * - If the operation is blocked, returns a `Success` object with `false`.
   * - If an error occurs, returns an `Err` object containing an error message.
   */
  toggleMonotonicity(
    regulatorId: number,
    targetId: number,
    addIntoUndoRedo: boolean,
    force: boolean
  ): void;

  // #endregion

  // #region --- Regulation formating ---

  regulationToString(regulation: Regulation): string;

  // #endregion
}
