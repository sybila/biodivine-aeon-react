import type { ComputationManagerInt } from '../../../../services/global/ComputationManager/ComputationManagerInt';
import type { ResultsStatus } from '../../../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { TabsState } from '../../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type StartCompTabContentProps = {
  computationManagerServ: ComputationManagerInt;
  tabStore: ZustandStore<TabsState>;
  resultsStatusStore: ZustandStore<ResultsStatus>;
};
