import MakeDecisionTab from './MakeDecisionTab/MakeDecisionTab';
import type { MakeDecisionTabInt } from './MakeDecisionTab/MakeDecisionTabInt';
import type { OtherStringsInt } from './OtherStringsInt';

class OtherStrings implements OtherStringsInt {
  public MakeDecisionTab: MakeDecisionTabInt = new MakeDecisionTab();
}

export default OtherStrings;
