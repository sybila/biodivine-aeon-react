import type { GlobalTooltipsInt } from './GlobalTooltipsInt';

class GlobalTooltips implements GlobalTooltipsInt {
  computeEngineStatus(): string {
    return 'Compute Engine Status';
  }

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

export default GlobalTooltips;
