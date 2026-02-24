import type { ControlPerturbationsTableInt } from '../../../../services/control-perturbations-table/ControlPerturbationsTableInt';
import type { LiveModelInt } from '../../../../services/global/LiveModel/LiveModelInt';
import type { DataFormatersInt } from '../../../../services/utilities/DataFormaters/DataFormatersInt';
import type { ResultsStatus } from '../../../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type OverviewTabContentProps = {
  liveModelServ: LiveModelInt;
  controlPerturbationsTableServ: ControlPerturbationsTableInt;
  dataFormatersServ: DataFormatersInt;
  resultsStatusStore: ZustandStore<ResultsStatus>;
};
