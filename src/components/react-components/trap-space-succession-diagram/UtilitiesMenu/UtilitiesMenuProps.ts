import type { UtilitiesMenuOtherStringsInt } from '../../../../services/global/StringProvider/TrapSpaceSDPageStrings/OtherStrings/UtilitiesMenu/UtilitiesMenuOtherStringsInt';
import type { UtilitiesMenuTooltipsInt } from '../../../../services/global/StringProvider/TrapSpaceSDPageStrings/Tooltips/UtilitiesMenu/UtilitiesMenuTooltipsInt';
import type { TrapSpaceSuccessionDiagramInt } from '../../../../services/trap-space-succession-diagram/TrapSpaceSuccessionDiagram/TrapSpaceSuccessionDiagramInt';
import type { BifurcationExplorerStatusState } from '../../../../stores/AttractorBifurcationExplorer/BifurcationExplorerStatusState';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { TrapSpaceSDStatusState } from '../../../../stores/TrapSpaceSuccessionDiagram/TrapSpaceSDStatusState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type UtilitiesMenuProps = {
  trapSpaceSDServ: TrapSpaceSuccessionDiagramInt;
  generalStringsServ: UtilitiesMenuOtherStringsInt;
  tooltipStringsServ: UtilitiesMenuTooltipsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
  trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>;
};
