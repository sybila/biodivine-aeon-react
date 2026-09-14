import type { GlobalStringsInt } from './GlobalStringsInt';
import Tooltips from './Tooltips/Tooltips';
import type { TooltipsInt } from './Tooltips/TooltipsInt';

class GlobalStrings implements GlobalStringsInt {
  public Tooltips: TooltipsInt;

  constructor() {
    this.Tooltips = new Tooltips();
  }
}

export default GlobalStrings;
