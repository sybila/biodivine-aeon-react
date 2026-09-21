export interface OverviewTabInt {
  // #region --- Global ---

  noSelectedItem(): string;

  numberOfInterpretationsStatName(): string;

  numberOfFixedVarsStatName(): string;

  numberOfFreeVarsStatName(): string;

  // #endregion

  // #region --- Edge ----

  edgeStateVariablesHeader(): string;

  numberOfMinTrapSpacesStatName(): string;

  // #endregion

  // #region --- Node ---

  nodeStateVariablesHeader(): string;

  numberOfChildrenStatName(): string;

  // #endregion
}
