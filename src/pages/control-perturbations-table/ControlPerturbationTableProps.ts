import type { ControlPerturbationsTableInt } from '../../services/control-perturbations-table/ControlPerturbationsTableInt';
import type { LiveModelInt } from '../../services/global/LiveModel/LiveModelInt';
import type { LoadingInt } from '../../services/global/Loading/LoadingInt';
import type { StringProviderInt } from '../../services/global/StringProvider/StringProviderInt';
import type { DataFormatersInt } from '../../services/utilities/DataFormaters/DataFormatersInt';
import type { SearchAndFilterHelpersInt } from '../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import type { ResultsStatus } from '../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { PerturbationFiltersSortState } from '../../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/PerturbationsFilterSortState';
import type { HelpHoverState } from '../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../stores/ZustandStoreType';

export type ControlPerturbationTableProps = {
  liveModelServ: LiveModelInt;
  controlPerturbationsTableServ: ControlPerturbationsTableInt;
  dataFormatersServ: DataFormatersInt;
  searchAndFilterHelpersServ: SearchAndFilterHelpersInt;
  loadingServ: LoadingInt;
  stringProviderServ: StringProviderInt;

  resultsStatusStore: ZustandStore<ResultsStatus>;
  perturbationFilterSortStore: ZustandStore<PerturbationFiltersSortState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
