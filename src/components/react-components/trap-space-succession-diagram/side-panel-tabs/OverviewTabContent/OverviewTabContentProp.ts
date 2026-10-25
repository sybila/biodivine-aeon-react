import type { OverviewTabOtherStringsInt } from '../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/OtherStrings/OverviewTab/OverviewTabOtherStringsInt';
import type { OverviewTabTooltipsInt } from '../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/Tooltips/OverviewTab/OverviewTabTooltipsInt';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { TrapSpaceSDStatusState } from '../../../../../stores/TrapSpaceSuccessionDiagram/TrapSpaceSDStatusState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type OverviewTabContentProps = {
  generalStringsServ: OverviewTabOtherStringsInt;
  tooltipStringsServ: OverviewTabTooltipsInt;

  trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
