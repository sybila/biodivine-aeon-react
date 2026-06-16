import GlobalTooltips from './GlobalTooltips/GlobalTooltips';
import type { GlobalTooltipsInt } from './GlobalTooltips/GlobalTooltipsInt';
import type { ToolTipsInt } from './ToolTipsInt';

class ToolTips implements ToolTipsInt {
  public GlobalTooltips: GlobalTooltipsInt;

  constructor() {
    this.GlobalTooltips = new GlobalTooltips();
  }
}

export default ToolTips;
