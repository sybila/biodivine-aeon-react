import OverlayWindowTooltips from './OverlayWindowTooltips/OverlayWindowTooltips';
import type { OverlayWindowTooltipsInt } from './OverlayWindowTooltips/OverlayWindowTooltipsInt';
import type { TooltipsInt } from './TooltipsInt';

class Tooltips implements TooltipsInt {
  // #region --- Sub-modules and Constructor ---

  public OverlayWindowTooltips: OverlayWindowTooltipsInt;

  constructor() {
    this.OverlayWindowTooltips = new OverlayWindowTooltips();
  }

  // #endregion

  computeEngineStatus(): string {
    return 'Compute Engine Status';
  }

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

export default Tooltips;
