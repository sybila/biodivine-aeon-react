import MakeDecisionTabOtherStrings from './MakeDecisionTab/MakeDecisionTabOtherStrings';
import type { MakeDecisionTabOtherStringsInt } from './MakeDecisionTab/MakeDecisionTabOtherStringsInt';
import type { OtherStringsInt } from './OtherStringsInt';
import OverviewTab from './OverviewTab/OverviewTab';
import type { OverviewTabInt } from './OverviewTab/OverviewTabInt';

class OtherStrings implements OtherStringsInt {
  public OverviewTab: OverviewTabInt = new OverviewTab();
  public MakeDecisionTab: MakeDecisionTabOtherStringsInt =
    new MakeDecisionTabOtherStrings();
}

export default OtherStrings;
