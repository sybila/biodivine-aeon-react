import type { OverviewTabOtherStringsInt } from '../../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/OtherStrings/OverviewTab/OverviewTabOtherStringsInt';
import type { OverviewTabTooltipsInt } from '../../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/Tooltips/OverviewTab/OverviewTabTooltipsInt';
import type { HelpHoverState } from '../../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../../stores/ZustandStoreType';
import type { NodeDataTSSD } from '../../../../../../types/types';

export type TrapSpaceOverviewProps = {
  trapSpace: NodeDataTSSD;

  generalStringsServ: OverviewTabOtherStringsInt;
  tooltipStringsServ: OverviewTabTooltipsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
