import AttractorClassesTabTooltips from './AttractorClassesTab/AttractorClassesTabTooltips';
import type { AttractorClassesTabTooltipsInt } from './AttractorClassesTab/AttractorClassesTabTooltipsInt';
import MakeDecisionTabTooltips from './MakeDecisionTab/MakeDecisionTabTooltips';
import type { MakeDecisionTabTooltipsInt } from './MakeDecisionTab/MakeDecisionTabTooltipsInt';
import OverviewTabTooltips from './OverviewTab/OverviewTabTooltips';
import type { OverviewTabTooltipsInt } from './OverviewTab/OverviewTabTooltipsInt';
import type { TooltipsInt } from './TooltipsInt';
import UtilitiesMenuTooltips from './UtilitiesMenu/UtilitiesMenuTooltips';
import type { UtilitiesMenuTooltipsInt } from './UtilitiesMenu/UtilitiesMenuTooltipsInt';
import VisualOptionsTabTooltips from './VisualOptionsTab/VisualOptionsTabTooltips';
import type { VisualOptionsTabTooltipsInt } from './VisualOptionsTab/VisualOptionsTabTooltipsInt';

class Tooltips implements TooltipsInt {
  public OverviewTab: OverviewTabTooltipsInt = new OverviewTabTooltips();
  public MakeDecisionTab: MakeDecisionTabTooltipsInt =
    new MakeDecisionTabTooltips();
  public AttractorClassesTab: AttractorClassesTabTooltipsInt =
    new AttractorClassesTabTooltips();
  public VisualOptionsTab: VisualOptionsTabTooltipsInt =
    new VisualOptionsTabTooltips();

  public UtilitiesMenu: UtilitiesMenuTooltipsInt = new UtilitiesMenuTooltips();
}

export default Tooltips;
