import type { LoadingInt } from '../../../../../services/global/Loading/LoadingInt';
import type { SearchAndFilterHelpersInt } from '../../../../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import type { PerturbationFiltersSortState } from '../../../../../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/PerturbationsFilterSortState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type SelectVarFilterTableProps = {
  variableNames: Array<string>;

  searchAndFilterHelpersServ: SearchAndFilterHelpersInt;
  loadingServ: LoadingInt;

  perturbationFilterSortStore: ZustandStore<PerturbationFiltersSortState>;
};
