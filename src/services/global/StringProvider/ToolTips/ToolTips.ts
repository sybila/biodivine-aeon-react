import AttractorBifurcationExplorerTooltips from './AttractorBifurcationExplorerTooltips/AttractorBifurcationExplorerTooltips';
import type { AttractorBifurcationExplorerTooltipsInt } from './AttractorBifurcationExplorerTooltips/AttractorBifurcationExplorerTooltipsInt';
import GlobalTooltips from './GlobalTooltips/GlobalTooltips';
import type { GlobalTooltipsInt } from './GlobalTooltips/GlobalTooltipsInt';
import type { ToolTipsInt } from './ToolTipsInt';

class ToolTips implements ToolTipsInt {
  public GlobalTooltips: GlobalTooltipsInt;
  public AttractorBifurcationExplorerTooltips: AttractorBifurcationExplorerTooltipsInt;

  constructor() {
    this.GlobalTooltips = new GlobalTooltips();
    this.AttractorBifurcationExplorerTooltips =
      new AttractorBifurcationExplorerTooltips();
  }
}

export default ToolTips;
