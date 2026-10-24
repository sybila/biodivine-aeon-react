import type { VariableStateFilterTableOtherStringsInt } from '../../common-strings/VariableStateFilterTable/VariableStateFilterTableOtherStrings/VariableStateFilterTableOtherStringsInt';

/** Class which provides general strings used in the make decision tab of Trap Space Succession Diagram Page. */
export interface MakeDecisionTabOtherStringsInt extends VariableStateFilterTableOtherStringsInt {
  cannotMakeDecisionOnLeafNode(): string;
  noSelectedNode(): string;

  getTrapSpacesButton(): string;
  getStableMotifsButton(): string;
  selectDecisionButton(): string;
  noAvailableStableMotifs(): string;

  fullStableMotifStateHeader(): string;
}
