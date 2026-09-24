import MakeDecisionTabOtherStrings from './MakeDecisionTab/MakeDecisionTabOtherStrings';
import type { MakeDecisionTabOtherStringsInt } from './MakeDecisionTab/MakeDecisionTabOtherStringsInt';
import type { OtherStringsInt } from './OtherStringsInt';
import OverviewTabOtherStrings from './OverviewTab/OverviewTabOtherStrings';
import type { OverviewTabOtherStringsInt } from './OverviewTab/OverviewTabOtherStringsInt';
import VisualOptionsTabOtherStrings from './VisualOptionsTab/VisualOptionsTabOtherStrings';
import type { VisualOptionsTabOtherStringsInt } from './VisualOptionsTab/VisualOptionsTabOtherStringsInt';

class OtherStrings implements OtherStringsInt {
  public OverviewTab: OverviewTabOtherStringsInt =
    new OverviewTabOtherStrings();
  public MakeDecisionTab: MakeDecisionTabOtherStringsInt =
    new MakeDecisionTabOtherStrings();
  public VisualOptionsTab: VisualOptionsTabOtherStringsInt =
    new VisualOptionsTabOtherStrings();
}

export default OtherStrings;
