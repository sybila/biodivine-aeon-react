import type { ControlPerturbationsTableInt } from '../../services/control-perturbations-table/ControlPerturbationsTableInt';
import type { ResultsStatus } from '../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { PerturbationFiltersSortState } from '../../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/PerturbationsFilterSortState';
import type { ZustandStore } from '../../stores/ZustandStoreType';

export type ControlPerturbationTableProps = {
  controlPerturbationsTableServ: ControlPerturbationsTableInt;
  resultsStatusStore: ZustandStore<ResultsStatus>;
  perturbationFilterSortStore: ZustandStore<PerturbationFiltersSortState>;
};
