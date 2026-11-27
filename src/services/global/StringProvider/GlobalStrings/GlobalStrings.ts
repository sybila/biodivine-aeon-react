import type { GlobalStringsInt } from './GlobalStringsInt';
import OtherStrings from './OtherStrings/OtherStrings';
import type { OtherStringsInt } from './OtherStrings/OtherStringsInt';
import Tooltips from './Tooltips/Tooltips';
import type { TooltipsInt } from './Tooltips/TooltipsInt';

class GlobalStrings implements GlobalStringsInt {
  public Tooltips: TooltipsInt;
  public OtherStrings: OtherStringsInt;

  constructor() {
    this.Tooltips = new Tooltips();
    this.OtherStrings = new OtherStrings();
  }
}

export default GlobalStrings;
