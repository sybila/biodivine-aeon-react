import type { UpdateFunctionStatus } from "../../../../types/types";

export interface ModelInt {
  // #region --- Update Functions ---

  /** Validates the update function fragment for the specified variable and updates
   * the validation status using the provided callback.
   *
   * @param variableId The unique identifier of the variable whose update function
   * is being validated.
   * @param updateFunctionFragment The fragment of the model which contains all the data required for the validation of the function.
   * @param setUpdateFunctionStatus Callback which sets the status of update function (for example this.updateFunctionStore.getState().setUpdateFunctionStatus())
   */
  validateUpdateFunction(
    variableId: number,
    updateFunctionFragment: string,
    setUpdateFunctionStatus: (status: UpdateFunctionStatus) => void
  ): void;

  // #endregion
}
