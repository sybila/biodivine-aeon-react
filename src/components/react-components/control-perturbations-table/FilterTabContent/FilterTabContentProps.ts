import type { LoadingInt } from '../../../../services/global/Loading/LoadingInt';
import type { ControlPerturbationTablePageStringsInt } from '../../../../services/global/StringProvider/ControlPerturbationTablePageStrings/ControlPerturbationTablePageStringsInt';
import type { SearchAndFilterHelpersInt } from '../../../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import type { ResultsStatus } from '../../../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { PerturbationFiltersSortState } from '../../../../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/PerturbationsFilterSortState';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type FilterTabContentProps = {
  setStartFilter: (value: boolean) => void;
  startFilter: boolean;

  searchAndFilterHelpersServ: SearchAndFilterHelpersInt;
  pageStringProviderServ: ControlPerturbationTablePageStringsInt;
  loadingServ: LoadingInt;

  perturbationFilterSortStore: ZustandStore<PerturbationFiltersSortState>;
  resultsStatusStore: ZustandStore<ResultsStatus>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
