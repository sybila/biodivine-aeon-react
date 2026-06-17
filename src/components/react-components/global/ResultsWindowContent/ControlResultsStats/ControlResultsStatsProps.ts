import type { ControlPerturbationsTableInt } from '../../../../../services/control-perturbations-table/ControlPerturbationsTableInt';
import type { ResultsOperationsInt } from '../../../../../services/global/ResultsOperations/ResultsOperationsInt';
import type { ControlResultsInt } from '../../../../../services/global/StringProvider/GlobalStrings/Tooltips/OverlayWindowTooltips/ResultsTooltips/ControlResults/ControlResultsInt';
import type { DataFormatersInt } from '../../../../../services/utilities/DataFormaters/DataFormatersInt';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { ModelInfoState } from '../../../../../stores/LiveModel/ModelInfoStore/ModelInfoState';
import type { TabsState } from '../../../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';
import type { ControlResults } from '../../../../../types';

export type ControlResultsStatsProps = {
  results: ControlResults;

  controlPerturbationsTableServ: ControlPerturbationsTableInt;
  resultsOperationsServ: ResultsOperationsInt;
  dataFormatersServ: DataFormatersInt;
  tooltips: ControlResultsInt;

  modelInfoStore: ZustandStore<ModelInfoState>;
  tabsStore: ZustandStore<TabsState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
