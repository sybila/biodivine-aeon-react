import MakeDecisionTabTooltips from './MakeDecisionTab/MakeDecisionTabTooltips';
import type { MakeDecisionTabTooltipsInt } from './MakeDecisionTab/MakeDecisionTabTooltipsInt';
import type { TooltipsInt } from './TooltipsInt';

class Tooltips implements TooltipsInt {
  public MakeDecisionTab: MakeDecisionTabTooltipsInt =
    new MakeDecisionTabTooltips();
}

export default Tooltips;
     