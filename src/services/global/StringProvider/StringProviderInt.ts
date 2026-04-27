import type { HelpTextsInt } from './HelpTexts/HelpTextsInt';
import type { ToolTipsInt } from './ToolTips/ToolTipsInt';

/** Class which provides strings for different parts of application. (ex. tooltips, help text...k) */
export interface StringProviderInt {
  ToolTips: ToolTipsInt;
  HelpTexts: HelpTextsInt;
}
