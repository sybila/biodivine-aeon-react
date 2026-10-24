import type { PageSelectorTooltipsInt } from '../../../common-tooltips/PageSelectorTooltips/PageSelectorTooltipsInt';
import type { VariableStateFilterTableTooltipsInt } from '../../common-strings/VariableStateFilterTable/VariableStateFilterTableTooltips/VariableStateFilterTableTooltipsInt';

/** Tooltips for the  Make Decision Tab Menu of the Trap Space Succession Diagram Page. */
export interface MakeDecisionTabTooltipsInt extends VariableStateFilterTableTooltipsInt, PageSelectorTooltipsInt {
  getDecisionsButton(): string;

  selectDecisionButton(): string;


}
