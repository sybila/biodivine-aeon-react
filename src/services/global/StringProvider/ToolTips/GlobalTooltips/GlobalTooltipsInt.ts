import type { OverlayWindowTooltipsInt } from './OverlayWindowTooltips/OverlayWindowTooltipsInt';

/** Class which provides tooltip messages for global functionality */
export interface GlobalTooltipsInt {
  // #region --- Sub-modules and Constructor ---
  OverlayWindowTooltips: OverlayWindowTooltipsInt;

  // #endregion

  computeEngineStatus(): string;

  // #region Selection Buttons

  selectAllVariables(): string;
  deselectAllVariables(): string;
  toggleSelectedVariables(): string;

  // #endregion
}
