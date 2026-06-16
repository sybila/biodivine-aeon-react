import type { LoadingInt } from '../../../../../services/global/Loading/LoadingInt';
import type StringProvider from '../../../../../services/global/StringProvider/StringProvider';
import type { ControlPerturbationTablePageStringsInt } from '../../../../../services/global/StringProvider/ControlPerturbationTablePageStrings/ControlPerturbationTablePageStringsInt';
import type { SearchAndFilterHelpersInt } from '../../../../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import type { PerturbationFiltersSortState } from '../../../../../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/PerturbationsFilterSortState';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type SelectVarFilterTableProps = {
  variableNames: Array<string>;

  searchAndFilterHelpersServ: SearchAndFilterHelpersInt;
  pageStringProviderServ: ControlPerturbationTablePageStringsInt;
  loadingServ: LoadingInt;

  perturbationFilterSortStore: ZustandStore<PerturbationFiltersSortState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
