import VariableStateFilterTableTooltips from '../../common-strings/VariableStateFilterTable/VariableStateFilterTableTooltips/VariableStateFilterTableTooltips';
import type { MakeDecisionTabTooltipsInt } from './MakeDecisionTabTooltipsInt';

class MakeDecisionTabTooltips
  extends VariableStateFilterTableTooltips
  implements MakeDecisionTabTooltipsInt
{
  public getDecisionsButton() {
    return 'Compute available stable motifs (decisions) for this node.';
  }

  public selectDecisionButton() {
    return 'Select stable motif (edge) leading into new percolated trap space.';
  }

  public changeSelectedVariablesFilter(trapSpaceValue: string) {
    return `Change filter value of selected variables to ${trapSpaceValue}.`;
  }
  public removeSelectedVariablesFromFilter() {
    return 'Remove selected variables from filter.';
  }
}

export default MakeDecisionTabTooltips;
