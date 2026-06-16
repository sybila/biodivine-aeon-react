import type { AttractorBifurcationExplorerPageStringsInt } from './AttractorBifurcationExplorerPageStrings/AttractorBifurcationExplorerPageStringsInt';
import type { SelectionButtonsTooltipsInt } from './common-tooltips/SelectionButtonsTooltipsInt';
import type { ControlPerturbationTablePageStringsInt } from './ControlPerturbationTablePageStrings/ControlPerturbationTablePageStringsInt';
import type { ModelEditorPageStringsInt } from './ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { ToolTipsInt } from './ToolTips/ToolTipsInt';

/** Class which provides strings for different parts of application. (ex. tooltips, help text...k) */
export interface StringProviderInt {
  ToolTips: ToolTipsInt;
  ModelEditorPage: ModelEditorPageStringsInt;
  AttractorBifurcationExplorerPage: AttractorBifurcationExplorerPageStringsInt;
  AttractorVisualizerPage: AttractorBifurcationExplorerPageStringsInt;
  ControlPerturbationTablePage: ControlPerturbationTablePageStringsInt;
}
