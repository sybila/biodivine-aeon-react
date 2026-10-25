import type { VariableStateFilterTableOtherStringsInt } from '../../common-strings/VariableStateFilterTable/VariableStateFilterTableOtherStrings/VariableStateFilterTableOtherStringsInt';

/** Class which provides general strings used in the make decision tab of Trap Space Succession Diagram Page. */
export interface MakeDecisionTabOtherStringsInt extends VariableStateFilterTableOtherStringsInt {
  // #region --- Common ---

  cannotMakeDecisionOnLeafNode(): string;
  noSelectedNode(): string;

  filtersHeader(): string;

  fullStateHeader(): string;

  getDecisionsButton(): string;

  numberOfIntepretationsStatName(): string;

  // #ednregion

  // #region --- Stable Motifs Table ---

  stableMotifsTableHeader(): string;

  noAvailableStableMotifs(): string;

  selectStableMotifButton(): string;

  numberOfMinTrapSpaceStatName(): string;

  // #endregion

  // #region --- Trap Space Table ---

  trapSpacesTableHeader(): string;

  noAvailableTrapSpaces(): string;

  selectTrapSpaceButton(): string;

  // #endregion
}
