import HelpTexts from './HelpTexts/HelpTexts';
import type { HelpTextsInt } from './HelpTexts/HelpTextsInt';
import OtherStrings from './OtherStrings/OtherStrings';
import type { OtherStringsInt } from './OtherStrings/OtherStringsInt';
import type { StringProviderInt } from './StringProviderInt';
import ToolTips from './ToolTips/ToolTips';
import type { ToolTipsInt } from './ToolTips/ToolTipsInt';

class StringProvider implements StringProviderInt {
  public ToolTips: ToolTipsInt;
  public HelpTexts: HelpTextsInt;
  public OtherStrings: OtherStringsInt;

  constructor() {
    this.ToolTips = new ToolTips();
    this.HelpTexts = new HelpTexts();
    this.OtherStrings = new OtherStrings();
  }
}

export default StringProvider;
