import MakeDecisionTabOtherStrings from './MakeDecisionTab/MakeDecisionTabOtherStrings';
import type { MakeDecisionTabOtherStringsInt } from './MakeDecisionTab/MakeDecisionTabOtherStringsInt';
import type { OtherStringsInt } from './OtherStringsInt';

class OtherStrings implements OtherStringsInt {
  public MakeDecisionTab: MakeDecisionTabOtherStringsInt = new MakeDecisionTabOtherStrings();
}

export default OtherStrings;
