import OtherStrings from './OtherStrings/OtherStrings';
import type { OtherStringsInt } from './OtherStrings/OtherStringsInt';
import Tooltips from './Tooltips/Tooltips';
import type { TooltipsInt } from './Tooltips/TooltipsInt';
import type { TrapSpaceSDPageStringsInt } from './TrapSpaceSDPageStringsInt';


class TrapSpaceSDPageStrings implements TrapSpaceSDPageStringsInt {
  public Tooltips: TooltipsInt = new Tooltips();
  public OtherStrings: OtherStringsInt = new OtherStrings();
  
  public helpText() {
      return 'TODO - write text for the help menu tab';
  }
}

export default TrapSpaceSDPageStrings;
