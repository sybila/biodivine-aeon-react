import type { AttractorBifurcationExplorerTooltipsInt } from './AttractorBifurcationExplorerTooltips/AttractorBifurcationExplorerTooltipsInt';
import type { GlobalTooltipsInt } from './GlobalTooltips/GlobalTooltipsInt';
import type { ModelEditorTooltipsInt } from './ModelEditorTooltips/ModelEditorTooltipsInt';

/** Class which provides tooltips for various UI elements */
export interface ToolTipsInt {
  GlobalTooltips: GlobalTooltipsInt;
  ModelEditorTooltips: ModelEditorTooltipsInt;
  AttractorBifurcationExplorerTooltips: AttractorBifurcationExplorerTooltipsInt;
}
