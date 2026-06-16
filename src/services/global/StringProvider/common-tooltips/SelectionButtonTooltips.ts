import type { SelectionButtonsTooltipsInt } from './SelectionButtonsTooltipsInt';

class SelectionButtonsTooltips implements SelectionButtonsTooltipsInt {
  // #region Selection Buttons

  public selectAllVariables(): string {
    return 'Select all variables.';
  }

  public deselectAllVariables(): string {
    return 'Deselect all variables.';
  }

  public toggleSelectedVariables(): string {
    return 'Toggle selected variables.';
  }

  // #endregion
}

export default SelectionButtonsTooltips;
