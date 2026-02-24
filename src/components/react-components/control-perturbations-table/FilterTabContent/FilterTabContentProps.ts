import type { ResultsStatus } from '../../../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { PerturbationFiltersSortState } from '../../../../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/PerturbationsFilterSortState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type FilterTabContentProps = {
  setStartFilter: (value: boolean) => void;
  startFilter: boolean;
  perturbationFilterSortStore: ZustandStore<PerturbationFiltersSortState>;
  resultsStatusStore: ZustandStore<ResultsStatus>;
};
