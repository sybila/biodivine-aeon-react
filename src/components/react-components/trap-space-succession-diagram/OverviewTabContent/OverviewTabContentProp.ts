import type { OverviewTabOtherStringsInt } from '../../../../services/global/StringProvider/TrapSpaceSDPageStrings/OtherStrings/OverviewTab/OverviewTabOtherStringsInt';
import type { TrapSpaceSDStatusState } from '../../../../stores/TrapSpaceSuccessionDiagram/TrapSpaceSDStatusState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type OverviewTabContentProps = {
  generalStringsServ: OverviewTabOtherStringsInt;

  trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>;
};
