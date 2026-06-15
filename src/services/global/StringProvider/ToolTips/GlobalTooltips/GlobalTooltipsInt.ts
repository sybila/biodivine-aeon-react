/** Class which provides tooltip messages for global functionality */
export interface GlobalTooltipsInt {
  computeEngineStatus(): string;

  // #region Selection Buttons

  selectAllVariables(): string;
  deselectAllVariables(): string;
  toggleSelectedVariables(): string;

  // #endregion
}
