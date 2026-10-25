import type { OverviewTabOtherStringsInt } from '../../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/OtherStrings/OverviewTab/OverviewTabOtherStringsInt';
import type { HelpHoverState } from '../../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../../stores/ZustandStoreType';
import type { StableMotifInfo } from '../../../../../../types/types';

export type StableMotifOverviewProps = {
  stableMotif: StableMotifInfo;

  generalStringsServ: OverviewTabOtherStringsInt;
  tooltipStringsServ: OverviewTabTooltipsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
