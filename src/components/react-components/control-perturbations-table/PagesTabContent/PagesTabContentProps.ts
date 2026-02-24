import type { PerturbationFiltersSortState } from '../../../../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/PerturbationsFilterSortState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type PagesTabContentProps = {
  setStartFilter: (value: boolean) => void;
  startFilter: boolean;
  nextPageExists: boolean;
  perturbationFilterSortStore: ZustandStore<PerturbationFiltersSortState>;
};
