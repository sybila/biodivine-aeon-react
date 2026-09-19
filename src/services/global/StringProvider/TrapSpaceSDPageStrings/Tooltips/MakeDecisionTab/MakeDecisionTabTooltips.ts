import type { MakeDecisionTabTooltipsInt } from './MakeDecisionTabTooltipsInt';

class MakeDecisionTabTooltips implements MakeDecisionTabTooltipsInt {
  public getDecisionsButton() {
    return 'Compute available stable motifs (decisions) for this node.';
  }

  public selectDecisionButton() {
    return 'Select stable motif (edge) leading into new percolated trap space.';
  }
}

export default MakeDecisionTabTooltips;
