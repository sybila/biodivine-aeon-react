import type { SelectionButtonsTooltipsInt } from './SelectionButtonsTooltipsInt';

class SelectionButtonsTooltips implements SelectionButtonsTooltipsInt {
  // #region Selection Buttons

  public selectAllVariables() {
    return 'Select all variables.';
  }

  public deselectAllVariables() {
    return 'Deselect all variables.';
  }

  public toggleSelectedVariables() {
    return 'Toggle selected variables.';
  }

  // #endregion
}

export default SelectionButtonsTooltips;
