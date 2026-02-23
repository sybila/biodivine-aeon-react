import type { PerturbationFiltersSortState } from '../../../../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/PerturbationsFilterSortState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type SortTabContentProps = {
  startSort: boolean;
  setStartSort: (value: boolean) => void;
  perturbationFilterSortStore: ZustandStore<PerturbationFiltersSortState>;
};
