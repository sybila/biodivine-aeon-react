import type { ControlPerturbationsTableInt } from '../../services/control-perturbations-table/ControlPerturbationsTableInt';
import type { LiveModelInt } from '../../services/global/LiveModel/LiveModelInt';
import type { DataFormatersInt } from '../../services/utilities/DataFormaters/DataFormatersInt';
import type { SearchAndFilterHelpersInt } from '../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import type { ResultsStatus } from '../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { PerturbationFiltersSortState } from '../../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/PerturbationsFilterSortState';
import type { ZustandStore } from '../../stores/ZustandStoreType';

export type ControlPerturbationTableProps = {
  liveModelServ: LiveModelInt;
  controlPerturbationsTableServ: ControlPerturbationsTableInt;
  dataFormatersServ: DataFormatersInt;
  searchAndFilterHelpersServ: SearchAndFilterHelpersInt;
  resultsStatusStore: ZustandStore<ResultsStatus>;
  perturbationFilterSortStore: ZustandStore<PerturbationFiltersSortState>;
};
