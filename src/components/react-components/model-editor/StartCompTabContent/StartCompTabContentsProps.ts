import type { ComputationManagerInt } from '../../../../services/global/ComputationManager/ComputationManagerInt';
import type { LiveModelInt } from '../../../../services/global/LiveModel/LiveModelInt';
import type { WarningInt } from '../../../../services/global/Warning/WarningInt';
import type { ResultsStatus } from '../../../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { ControlStatus } from '../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { TabsState } from '../../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type StartCompTabContentProps = {
  liveModelServ: LiveModelInt;
  computationManagerServ: ComputationManagerInt;
  warningServ: WarningInt;

  tabStore: ZustandStore<TabsState>;
  resultsStatusStore: ZustandStore<ResultsStatus>;
  controlStore: ZustandStore<ControlStatus>;
};
