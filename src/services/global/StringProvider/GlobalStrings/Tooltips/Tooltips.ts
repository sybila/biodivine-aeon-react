import type { TooltipsInt } from './TooltipsInt';
import OverlayWindowTooltips from './OverlayWindowTooltips/OverlayWindowTooltips';
import type { OverlayWindowTooltipsInt } from './OverlayWindowTooltips/OverlayWindowTooltipsInt';

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

export default Tooltips;
