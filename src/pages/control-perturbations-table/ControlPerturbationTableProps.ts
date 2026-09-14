import type { ControlPerturbationsTableInt } from '../../services/control-perturbations-table/ControlPerturbationsTableInt';
import type { LiveModelInt } from '../../services/global/LiveModel/LiveModelInt';
import type { LoadingInt } from '../../services/global/Loading/LoadingInt';
import type { ShortcutManagerInt } from '../../services/global/ShortcutManager/ShortcutManagerInt';
import type { ControlPerturbationTablePageStringsInt } from '../../services/global/StringProvider/ControlPerturbationTablePageStrings/ControlPerturbationTablePageStringsInt';
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
  pageStringProviderServ: ControlPerturbationTablePageStringsInt;
  shortcutManagerServ?: ShortcutManagerInt;

  resultsStatusStore: ZustandStore<ResultsStatus>;
  perturbationFilterSortStore: ZustandStore<PerturbationFiltersSortState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
