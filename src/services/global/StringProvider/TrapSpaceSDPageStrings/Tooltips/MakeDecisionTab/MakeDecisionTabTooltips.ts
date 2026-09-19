import type { MakeDecisionTabTooltipsInt } from './MakeDecisionTabTooltipsInt';

class MakeDecisionTabTooltips implements MakeDecisionTabTooltipsInt {
  public getDecisionsButton() {
    return 'Compute available stable motifs (decisions) for this node.';
  }
}

export default MakeDecisionTabTooltips;
