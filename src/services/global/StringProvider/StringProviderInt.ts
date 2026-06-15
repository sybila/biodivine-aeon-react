import type { HelpTextsInt } from './HelpTexts/HelpTextsInt';
import type { OtherStringsInt } from './OtherStrings/OtherStringsInt';
import type { ToolTipsInt } from './ToolTips/ToolTipsInt';

/** Class which provides strings for different parts of application. (ex. tooltips, help text...k) */
export interface StringProviderInt {
  ToolTips: ToolTipsInt;
  HelpTexts: HelpTextsInt;
  OtherStrings: OtherStringsInt;
}
