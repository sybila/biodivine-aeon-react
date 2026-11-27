/** Interface which provides tooltips for the SelectionButtons component. */
export interface SelectionButtonsTooltipsInt {
  // #region Selection Buttons

  selectAllVariables(): string;
  deselectAllVariables(): string;
  toggleSelectedVariables(): string;

  // #endregion
}
