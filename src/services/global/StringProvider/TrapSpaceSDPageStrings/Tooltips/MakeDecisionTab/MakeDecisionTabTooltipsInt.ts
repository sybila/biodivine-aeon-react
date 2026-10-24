import type { VariableStateFilterTableTooltipsInt } from '../../common-strings/VariableStateFilterTable/VariableStateFilterTableTooltips/VariableStateFilterTableTooltipsInt';

/** Tooltips for the  Make Decision Tab Menu of the Trap Space Succession Diagram Page. */
export interface MakeDecisionTabTooltipsInt extends VariableStateFilterTableTooltipsInt {
  getDecisionsButton(): string;

  selectDecisionButton(): string;

  changeSelectedVariablesFilter(trapSpaceValue: string): string;
  removeSelectedVariablesFromFilter(): string;
}
