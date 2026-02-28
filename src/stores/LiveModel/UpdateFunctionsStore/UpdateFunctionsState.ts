import type { UpdateFunction, UpdateFunctionStatus } from '../../../types';

export type UpdateFunctionsState = {
  updateFunctions: Record<number, UpdateFunction>;

  /** Validation status for each update function. */
  updateFunctionStatus: Record<number, UpdateFunctionStatus>;

  /**
   * Set or update the update function for a variable.
   * If functionString is empty, deletes the update function.
   * Returns undefined on success, or an error string.
   */
  setUpdateFunction: (
    id: number,
    updateFunction: UpdateFunction
  ) => string | undefined;
  /**
   * Get the update function for a variable by id.
   */
  getUpdateFunctionId: (id: number) => UpdateFunction | undefined;
  /**
   * Delete the update function for a variable by id.
   */
  deleteUpdateFunctionId: (id: number) => undefined;
  /**
   * Get all update functions.
   */
  getAllUpdateFunctions: () => [string, UpdateFunction][];
  /** Get the id of the first variable where update function has an error, or undefined if there is no such variable. */
  errorInUpdateFunctions: () => number | undefined;
  /**
   * Reset the validation status of all update functions.
   */
  setUpdateFunctionStatus: (id: number, status: UpdateFunctionStatus) => void;
  /**
   * Remove all update functions.
   */
  resetUpdateFunctionStatus: () => void;
  clear: () => void;
};
