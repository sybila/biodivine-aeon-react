import AttractorClassesTabOtherStrings from './AttractorClassesTab/AttractorClassesTabOtherStrings';
import type { AttractorClassesTabOtherStringsInt } from './AttractorClassesTab/AttractorClassesTabOtherStringsInt';
import MakeDecisionTabOtherStrings from './MakeDecisionTab/MakeDecisionTabOtherStrings';
import type { MakeDecisionTabOtherStringsInt } from './MakeDecisionTab/MakeDecisionTabOtherStringsInt';
import type { OtherStringsInt } from './OtherStringsInt';
import OverviewTabOtherStrings from './OverviewTab/OverviewTabOtherStrings';
import type { OverviewTabOtherStringsInt } from './OverviewTab/OverviewTabOtherStringsInt';
import UtilitiesMenuOtherStrings from './UtilitiesMenu/UtilitiesMenuOtherStrings';
import type { UtilitiesMenuOtherStringsInt } from './UtilitiesMenu/UtilitiesMenuOtherStringsInt';
import VisualOptionsTabOtherStrings from './VisualOptionsTab/VisualOptionsTabOtherStrings';
import type { VisualOptionsTabOtherStringsInt } from './VisualOptionsTab/VisualOptionsTabOtherStringsInt';

class OtherStrings implements OtherStringsInt {
  public OverviewTab: OverviewTabOtherStringsInt =
    new OverviewTabOtherStrings();
  public MakeDecisionTab: MakeDecisionTabOtherStringsInt =
    new MakeDecisionTabOtherStrings();
  public AttractorClassesTab: AttractorClassesTabOtherStringsInt =
    new AttractorClassesTabOtherStrings();
  public VisualOptionsTab: VisualOptionsTabOtherStringsInt =
    new VisualOptionsTabOtherStrings();

  public UtilitiesMenu: UtilitiesMenuOtherStringsInt =
    new UtilitiesMenuOtherStrings();
}

export default OtherStrings;
