import type { Position } from '../../../../types';

/**
 * Interface for managing variables in the LiveModel.
 */
export interface VariablesLMInt {
  // #region --- Variable Actions ---

  /** Add a variable to the model */
  addVariable(
    modAllowed: boolean,
    position?: Position,
    name?: string,
    controllable?: boolean,
    phenotype?: any
  ): number | undefined;

  /** Removes variable and displays warnings if necessary
   *  Returns true if the variable was removed, false otherwise.
   *  Shows warnings if there are existing results or if the user needs to confirm variable removal.
   */
  removeVariableWithWarnings(id: number): Promise<boolean>;

  /** Remove a variable by its ID */
  removeVariable(id: number, force?: boolean): void;

  /** Rename a variable by its ID */
  renameVariable(
    id: number,
    newName: string,
    force?: boolean
  ): string | undefined;

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
