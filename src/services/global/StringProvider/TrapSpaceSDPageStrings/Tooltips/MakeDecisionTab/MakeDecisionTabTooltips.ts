import { EmptyBase } from '../../../../../../types/mixins';
import PageSelectorTooltips from '../../../common-tooltips/PageSelectorTooltips/PageSelectorTooltips';
import VariableStateFilterTableTooltips from '../../common-strings/VariableStateFilterTable/VariableStateFilterTableTooltips/VariableStateFilterTableTooltips';
import type { MakeDecisionTabTooltipsInt } from './MakeDecisionTabTooltipsInt';

const Mixins = VariableStateFilterTableTooltips(
  PageSelectorTooltips(EmptyBase)
);

class MakeDecisionTabTooltips
  extends Mixins
  implements MakeDecisionTabTooltipsInt
{
  public getDecisionsButton() {
    return 'Compute available stable motifs (decisions) for this node.';
  }

  public selectDecisionButton() {
    return 'Select stable motif (edge) leading into new percolated trap space.';
  }
}

export default MakeDecisionTabTooltips;
