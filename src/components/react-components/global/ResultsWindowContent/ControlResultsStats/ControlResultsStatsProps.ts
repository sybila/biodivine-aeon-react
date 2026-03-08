import type { ControlPerturbationsTableInt } from '../../../../../services/control-perturbations-table/ControlPerturbationsTableInt';
import type { ResultsOperationsInt } from '../../../../../services/global/ResultsOperations/ResultsOperationsInt';
import type { DataFormatersInt } from '../../../../../services/utilities/DataFormaters/DataFormatersInt';
import type { ModelInfoState } from '../../../../../stores/LiveModel/ModelInfoStore/ModelInfoState';
import type { TabsState } from '../../../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';
import type { ControlResults } from '../../../../../types';

export type ControlResultsStatsProps = {
  results: ControlResults;

  controlPerturbationsTableServ: ControlPerturbationsTableInt;
  resultsOperationsServ: ResultsOperationsInt;
  dataFormatersServ: DataFormatersInt;

  modelInfoStore: ZustandStore<ModelInfoState>;
  tabsStore: ZustandStore<TabsState>;
};
