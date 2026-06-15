import type { LoadingInt } from '../../../../services/global/Loading/LoadingInt';
import type { StringProviderInt } from '../../../../services/global/StringProvider/StringProviderInt';
import type { SearchAndFilterHelpersInt } from '../../../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import type { ResultsStatus } from '../../../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { PerturbationFiltersSortState } from '../../../../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/PerturbationsFilterSortState';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type FilterTabContentProps = {
  setStartFilter: (value: boolean) => void;
  startFilter: boolean;

  searchAndFilterHelpersServ: SearchAndFilterHelpersInt;
  stringProviderServ: StringProviderInt;
  loadingServ: LoadingInt;

  perturbationFilterSortStore: ZustandStore<PerturbationFiltersSortState>;
  resultsStatusStore: ZustandStore<ResultsStatus>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
