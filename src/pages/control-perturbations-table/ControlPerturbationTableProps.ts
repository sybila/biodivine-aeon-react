import type { PerturbationFiltersSortState } from '../../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/PerturbationsFilterSortState';
import type { ZustandStore } from '../../stores/ZustandStoreType';

export type ControlPerturbationTableProps = {
  perturbationFilterSortStore: ZustandStore<PerturbationFiltersSortState>;
};
