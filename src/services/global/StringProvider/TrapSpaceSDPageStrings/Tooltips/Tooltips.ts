import MakeDecisionTabTooltips from './MakeDecisionTab/MakeDecisionTabTooltips';
import type { MakeDecisionTabTooltipsInt } from './MakeDecisionTab/MakeDecisionTabTooltipsInt';
import type { TooltipsInt } from './TooltipsInt';
import VisualOptionsTabTooltips from './VisualOptionsTab/VisualOptionsTabTooltips';
import type { VisualOptionsTabTooltipsInt } from './VisualOptionsTab/VisualOptionsTabTooltipsInt';

class Tooltips implements TooltipsInt {
  public MakeDecisionTab: MakeDecisionTabTooltipsInt =
    new MakeDecisionTabTooltips();
  public VisualOptionsTab: VisualOptionsTabTooltipsInt =
    new VisualOptionsTabTooltips();
}

export default Tooltips;
