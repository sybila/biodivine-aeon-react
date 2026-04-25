import type { StringProviderInt } from './StringProviderInt';
import ToolTips from './ToolTips/ToolTips';
import type { ToolTipsInt } from './ToolTips/ToolTipsInt';

class StringProvider implements StringProviderInt {
  public ToolTips: ToolTipsInt;

  constructor() {
    this.ToolTips = new ToolTips();
  }
}

export default StringProvider;
