import MakeDecisionTabTooltips from './MakeDecisionTab/MakeDecisionTabTooltips';
import type { MakeDecisionTabTooltipsInt } from './MakeDecisionTab/MakeDecisionTabTooltipsInt';
import type { TooltipsInt } from './TooltipsInt';
import UtilitiesMenuTooltips from './UtilitiesMenu/UtilitiesMenuTooltips';
import type { UtilitiesMenuTooltipsInt } from './UtilitiesMenu/UtilitiesMenuTooltipsInt';
import VisualOptionsTabTooltips from './VisualOptionsTab/VisualOptionsTabTooltips';
import type { VisualOptionsTabTooltipsInt } from './VisualOptionsTab/VisualOptionsTabTooltipsInt';

class Tooltips implements TooltipsInt {
  public MakeDecisionTab: MakeDecisionTabTooltipsInt =
    new MakeDecisionTabTooltips();
  public VisualOptionsTab: VisualOptionsTabTooltipsInt =
    new VisualOptionsTabTooltips();

  public UtilitiesMenu: UtilitiesMenuTooltipsInt = new UtilitiesMenuTooltips();
}

export default Tooltips;
