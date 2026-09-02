import type { Result } from '../../../../types/result';
import type { PhenotypeStatus, Position } from '../../../../types/types';

/**
 * Interface for managing variables in the LiveModel.
 */
export interface VariablesLMInt {
  // #region --- Setters for Model Visualization functions ---

  /** Setter for the function that adds new node to the model visualization */
  setAddNodeFromVisualizationFunction(
    func: (
      id: number,
      variableName: string,
      position?: Position,
      fit?: boolean
    ) => void
  ): void;

  /** Setter for the function that removes a node from the model visualization */
  setRemoveNodeFromVisualizationFunction(
    func: (variableId: number) => void
  ): void;

  /** Setter for the function that renames a node in the model visualization */
  setRenameNodeFromVisualizationFunction(
    func: (variableId: number, newName: string) => void
  ): void;

  /** Setter for the function that gets a node's position from the model visualization */
  setGetNodePositionFromVisualizationFunction(
    func: (variableId: number) => Position | undefined
  ): void;

  // #endregion

  // #region --- Variable Actions ---

  /**
 * Adds a new variable to the model.
 *
 * @param options - An object containing options for the operation.
 * @param options.force - A boolean indicating whether the operation should be executed, even if it would be blocked by another operation.
 * @param options.addIntoUndoRedo - A boolean indicating whether to add this operation into the undo/redo stack.
 * @param options.fitVisualization (optional) - A boolean indicating whether to fit the visualization to the whole model after the variable is created. If not provided, defaults to `true`.
 * @param varInfo (optional) - An object containing information about the variable to be created.
 * @param varInfo.id - The ID of the variable to be created. If not provided, a new unique ID will be generated.
 * @param varInfo.name - The name of the variable to be created. If not provided, a default name will be generated.
 * @param varInfo.position - The position where the newly created variable should be placed in the visualization. If not provided, the variable will be positioned based on the model's layout rules.
 * @param varInfo.controlEnabled - The control-enabled value for the newly created variable. If not provided, defaults to `true`.
 * @param varInfo.phenotype - The phenotype value of the new variable in the currently edited phenotype. If not provided, defaults to 
`PhenotypeStatus.Default`.
 * @returns A `Result` object detailing the outcome of the operation.
 * - If the operation is successful, returns a `Success` object containing the ID of the newly created variable.
 * - If the operation is blocked, returns a `Success` object with `undefined`.
 * - If an error occurs, returns an `Err` object containing an error message.
 */
  addVariable(
    options: {
      force: boolean;
      addIntoUndoRedo: boolean;
      fitVisualization?: boolean;
    },
    varInfo?: {
      id?: number;
      name?: string;
      position?: Position;
      controlEnabled?: boolean;
      phenotype?: PhenotypeStatus;
    }
  ): Result<number | undefined>;

  /** Removes variable and displays warnings if necessary
   *  Returns true if the variable was removed, false otherwise.
   *  Shows warnings if there are existing results or if the user needs to confirm variable removal.
   *  @param id - The ID of the variable to be removed.
   *  @param addIntoUndoRedo - Whether to add this operation into the undo/redo stack.
   */
  removeVariableWithWarnings(
    id: number,
    addIntoUndoRedo: boolean
  ): Promise<boolean>;

  /** Remove a variable by its ID
   *  @param id - The ID of the variable to be removed.
   *  @param addIntoUndoRedo - Whether to add this operation into the undo/redo stack.
   *  @param force - Whether to force the removal.
   *  @returns A `Result` object detailing the outcome of the operation.
   * - If the operation is successful, returns a `Success` object with `true`.
   * - If the operation is blocked, returns a `Success` object with `false`.
   * - If an error occurs, returns an `Err` object containing an error message.
   */
  removeVariable(
    id: number,
    addIntoUndoRedo: boolean,
    force?: boolean
  ): Result<boolean>;

  /** Rename a variable by its ID
   *  @param id - The ID of the variable to be removed.
   *  @param newName - The new name of the variable.
   *  @param addIntoUndoRedo - Whether to add this operation into the undo/redo stack.
   *  @param force - Whether to force the removal.
   *  @returns A `Result` object detailing the outcome of the operation.
   * - If the operation is successful, returns a `Success` object with `true`.
   * - If the operation is blocked, returns a `Success` object with `false`.
   * - If an error occurs, returns an `Err` object containing an error message.
   */
  renameVariable(
    id: number,
    newName: string,
    addIntoUndoRedo: boolean,
    force: boolean
  ): Result<boolean>;

  // #endregion

  // #region --- Pruning ---

  /** Remove all variables that are not used in any regulation.
   *  Returns the number of removed variables.
   */
  pruneConstants(force?: boolean): number;

  /** Remove all variables that have no outgoing regulations (no targets).
   *  Returns the number of removed variables.
   */
  pruneOutputs(): number;

  // #endregion

  // #region --- Variables status ---

  /** True if the model has no variables. */
  isEmpty(): boolean;

  /** Removes all variables from the model. */
  clear(): void;

  // #endregion
}
