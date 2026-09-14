import type { AttractorBifurcationExplorerInt } from '../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { AttractorVisualizerInt } from '../../../../services/attractor-visualizer/AttractorVisualizerInt';
import type { ControlPerturbationsTableInt } from '../../../../services/control-perturbations-table/ControlPerturbationsTableInt';
import type { ComputationManagerInt } from '../../../../services/global/ComputationManager/ComputationManagerInt';
import type { ResultsOperationsInt } from '../../../../services/global/ResultsOperations/ResultsOperationsInt';
import type { GlobalStringsInt } from '../../../../services/global/StringProvider/GlobalStrings/GlobalStringsInt';
import type { DataFormatersInt } from '../../../../services/utilities/DataFormaters/DataFormatersInt';
import type { ResultsStatus } from '../../../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ModelInfoState } from '../../../../stores/LiveModel/ModelInfoStore/ModelInfoState';
import type { TabsState } from '../../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type ResultsWindowContentProps = {
  computationManagerServ: ComputationManagerInt;
  attractorVisualizerServ: AttractorVisualizerInt;
  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
  controlPerturbationsTableServ: ControlPerturbationsTableInt;
  resultsOperationsServ: ResultsOperationsInt;
  dataFormatersServ: DataFormatersInt;
  pageStringProviderServ: GlobalStringsInt;

  modelInfoStore: ZustandStore<ModelInfoState>;
  tabsStore: ZustandStore<TabsState>;
  resultsStatusStore: ZustandStore<ResultsStatus>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
