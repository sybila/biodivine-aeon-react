import type { AttractorBifurcationExplorerPageStringsInt } from './AttractorBifurcationExplorerPageStrings/AttractorBifurcationExplorerPageStringsInt';
import type { SelectionButtonsTooltipsInt } from './common-tooltips/SelectionButtonsTooltipsInt';
import type { HelpTextsInt } from './HelpTexts/HelpTextsInt';
import type { ModelEditorPageStringsInt } from './ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { ToolTipsInt } from './ToolTips/ToolTipsInt';

/** Class which provides strings for different parts of application. (ex. tooltips, help text...k) */
export interface StringProviderInt extends SelectionButtonsTooltipsInt {
  ToolTips: ToolTipsInt;
  HelpTexts: HelpTextsInt;
  ModelEditorPage: ModelEditorPageStringsInt;
  AttractorBifurcationExplorerPage: AttractorBifurcationExplorerPageStringsInt;
}
