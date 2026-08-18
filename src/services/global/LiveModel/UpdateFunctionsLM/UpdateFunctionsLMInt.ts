import type {
  UpdateFunctionMetadata,
  UpdateFunctionStatus,
} from '../../../../types/types';

/**
 * Interface for managing update functions of variables in model.
 */
export interface UpdateFunctionsLMInt {
  // #region --- Update Function Operations ---

  /** Sets update function for a variable.
   *  @param id ID of the variable to set the update function for.
   *  @param functionString The update function as a string.
   *  @param force If true, bypasses model modification checks. (Warning - Doesn't bypass update function validation checks)
   *  @returns An error message if the operation fails, otherwise undefined.
   */
  setUpdateFunction(
    id: number,
    functionString: string,
    addIntoUndoRedo: boolean,
    force: boolean
  ): string | undefined;

  /** Deletes the update function for a variable.
   *  @param id ID of the variable to delete the update function for.
   */
  deleteUpdateFunctionId(id: number): void;

  // #endregion

  // #region --- Validation ---

  /** Validates all update functions if the number of variables has changed since the last validation. */
  validateUpdateFunctionsIfNeeded(): void;

  /** Validates all update functions and sets state of each update function in the ModelEditor tab. */
  validateAllUpdateFunctions(): void;

  /**  Validates the update function for a specific variable ID and sets its status in the ModelEditor tab.
   *   @param id (number) id of variable whichs update function we want to validate
   *   @param setStatusFunction ( (status: UpdateFunctionStatus) => void? ) optional setter which is used for setting the new update function status (if not set defautlu sets update function status into the update function store)
   *   @param updateFunction (string?) optional parameter which overwrites the current update function of variable specified by the id parameter (used for validation of update function before it was set)
   */
  validateUpdateFunction(
    id: number,
    setStatusFunction?: (status: UpdateFunctionStatus) => void,
    updateFunction?: string
  ): void;

  // #endregion

  // #region --- Create Metadata + Check Update Function Validity ---

  /** Checks the validity of an update function and creates metadata about it.
   *  @param id ID of the variable whose update function is to be checked.
   *  @param functionString The update function as a string.
   *  @returns An error message if the function is invalid, otherwise metadata about the function.
   */
  checkUpdateFunction(
    id: number,
    functionString: string
  ): string | UpdateFunctionMetadata;

  // #endregion
}
