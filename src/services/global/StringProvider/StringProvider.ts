import HelpTexts from './HelpTexts/HelpTexts';
import type { HelpTextsInt } from './HelpTexts/HelpTextsInt';
import type { StringProviderInt } from './StringProviderInt';
import ToolTips from './ToolTips/ToolTips';
import type { ToolTipsInt } from './ToolTips/ToolTipsInt';

class StringProvider implements StringProviderInt {
  public ToolTips: ToolTipsInt;
  public HelpTexts: HelpTextsInt;

  constructor() {
    this.ToolTips = new ToolTips();
    this.HelpTexts = new HelpTexts();
  }
}

export default StringProvider;
