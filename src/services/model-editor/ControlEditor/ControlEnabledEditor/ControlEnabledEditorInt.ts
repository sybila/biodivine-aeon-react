import type { ControlEditorInt } from '../ControlEditorInt';

export interface ControlEnabledEditorInt extends ControlEditorInt {
  /** Changes the control enabled state of a variable by its ID */
  changeControlEnabled(id: number, enabled: boolean): void;

  /** Toggles the control enabled state of a variable by its ID */
  toggleControlEnabled(id: number): void;

  /** Changes the control enabled state of selected variables.
   *  @param selectedVariables - Set of variable IDs:
   *  @param controlEnabled - The new control enabled state to set (true or false)
   *  Only variables that are marked as selected (true) will have their control enabled state changed.
   *  Variables not present in the selectedVariables array are considered not selected and will be ignored.
   *  If a variable name does not correspond to any existing variable, it will be ignored.
   */
  changeControlEnabledSelected(
    selectedVariables: Set<number>,
    controlEnabled: boolean
  ): void;
}
