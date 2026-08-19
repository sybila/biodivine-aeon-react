import type { Result } from '../../../../types/result';
import type { ControlEditorInt } from '../ControlEditorInt';

export interface ControlEnabledEditorInt extends ControlEditorInt {
  /**
   * Changes the control enabled state for a given control-enabled value.
   *
   * @param id - The unique identifier for the control.
   * @param enabled - A boolean value indicating whether the control should be enabled (`true`) or disabled (`false`).
   * @returns A `Result` object indicating whether the operation was successful or if there was an error.
   */
  changeControlEnabled(id: number, enabled: boolean): Result<boolean>;

  /**
   * Toggles the control enabled state for a given control identifier.
   *
   * @param id - The unique identifier for the control.
   * @returns A `Result` object indicating whether the operation was successful or if there was an error.
   */
  toggleControlEnabled(id: number): Result<boolean>;

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
