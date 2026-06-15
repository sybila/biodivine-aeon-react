import type { AttractorBifurcationExplorerInt } from '../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { AttractorVisualizerInt } from '../../../../services/attractor-visualizer/AttractorVisualizerInt';
import type { ControlPerturbationsTableInt } from '../../../../services/control-perturbations-table/ControlPerturbationsTableInt';
import type { ComputationManagerInt } from '../../../../services/global/ComputationManager/ComputationManagerInt';
import type { TabOperationsInt } from '../../../../services/global/Navigation/TabOperationsInt';
import type { OpenCloseOperationsInt } from '../../../../services/global/OpenCloseOperations/OpenCloseOperationsInt';
import type { ResultsOperationsInt } from '../../../../services/global/ResultsOperations/ResultsOperationsInt';
import type { StringProviderInt } from '../../../../services/global/StringProvider/StringProviderInt';
import type { WarningInt } from '../../../../services/global/Warning/WarningInt';
import type { DataFormatersInt } from '../../../../services/utilities/DataFormaters/DataFormatersInt';
import type { ComputeEngineStatusState } from '../../../../stores/ComputationManager/ComputeEngineStatusStore/ComputeEngineStatusState';
import type { ResultsStatus } from '../../../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { OverlayWindowState } from '../../../../stores/ContentOverlayWindow/OverlayWindowState';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ModelInfoState } from '../../../../stores/LiveModel/ModelInfoStore/ModelInfoState';
import type { TabsState } from '../../../../stores/Navigation/TabState';
import type { WarningState } from '../../../../stores/Warning/WarningState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type BaseLayoutProps = {
  attractorVisualizerServ: AttractorVisualizerInt;
  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
  controlPerturbationsTableServ: ControlPerturbationsTableInt;
  computationManagerServ: ComputationManagerInt;
  resultsOperationsServ: ResultsOperationsInt;
  openCloseOperationsServ: OpenCloseOperationsInt;
  tabOperationsServ: TabOperationsInt;
  dataFormatersServ: DataFormatersInt;
  warningServ: WarningInt;
  stringProviderServ: StringProviderInt;

  computeEngineStatusStore: ZustandStore<ComputeEngineStatusState>;
  resultsStatusStore: ZustandStore<ResultsStatus>;
  modelInfoStore: ZustandStore<ModelInfoState>;
  tabsStore: ZustandStore<TabsState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
  overlayWindowStore: ZustandStore<OverlayWindowState>;
  warningStore: ZustandStore<WarningState>;
};
