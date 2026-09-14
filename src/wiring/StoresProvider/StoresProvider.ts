import type { MessageInt } from '../../services/global/Message/MessageInt';
import type { BifurcationExplorerStatusState } from '../../stores/AttractorBifurcationExplorer/BifurcationExplorerStatusState';
import createBifurcationExplorerStatusStore from '../../stores/AttractorBifurcationExplorer/createBifurcationExplorerStatusStore';
import type { AttractorVisualizerStatusState } from '../../stores/AttractorVisualizer/AttractorVisualizerStatusState';
import createAttractorVisualizerStatusStore from '../../stores/AttractorVisualizer/createAttractorVisualizerStatusStore';
import type { ComputeEngineStatusState } from '../../stores/ComputationManager/ComputeEngineStatusStore/ComputeEngineStatusState';
import createComputeEngineStatusStore from '../../stores/ComputationManager/ComputeEngineStatusStore/createComputeEngineStatusStore';
import createResultsStatusStore from '../../stores/ComputationManager/ResultStatus/createResultsStatusStore';
import type { ResultsStatus } from '../../stores/ComputationManager/ResultStatus/ResultStatus';
import createOverlayWindowStore from '../../stores/ContentOverlayWindow/createOverlayWindowStore';
import type { OverlayWindowState } from '../../stores/ContentOverlayWindow/OverlayWindowState';
import createPerturbationFilterSortStore from '../../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/createPerturbationsFilterSortStore';
import type { PerturbationFiltersSortState } from '../../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/PerturbationsFilterSortState';
import createHelpHoverStore from '../../stores/HelpHover/createHelpHoverStore';
import type { HelpHoverState } from '../../stores/HelpHover/HelpHoverState';
import type { ControlStatus } from '../../stores/LiveModel/ControlStore/ControlStatus';
import createControlStore from '../../stores/LiveModel/ControlStore/createControlStore';
import createLoadedModelStore from '../../stores/LiveModel/LoadedModelStore/createLoadedModelStore';
import type { ModelState } from '../../stores/LiveModel/LoadedModelStore/ModelState';
import createModelInfoStore from '../../stores/LiveModel/ModelInfoStore/createModelInfoStore';
import type { ModelInfoState } from '../../stores/LiveModel/ModelInfoStore/ModelInfoState';
import createRegulationsStore from '../../stores/LiveModel/RegulationsStore/createRegulationsStore';
import type { RegulationsStatus } from '../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import createUpdateFunctionsStore from '../../stores/LiveModel/UpdateFunctionsStore/createUpdateFunctionsStore';
import type { UpdateFunctionsState } from '../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import createVariablePositionsStore from '../../stores/LiveModel/VariablePositions/createVariablePositionsStore';
import type { VariablePositionsState } from '../../stores/LiveModel/VariablePositions/VariablePostionsState';
import createVariablesStore from '../../stores/LiveModel/VariablesStore/createVariablesStore';
import type { VariablesStatus } from '../../stores/LiveModel/VariablesStore/VariablesStatus';
import createModelEditorStatusStore from '../../stores/ModelEditor/createModelEditorStatusStore';
import type { ModelEditorStatus } from '../../stores/ModelEditor/ModelEditorStatus';
import createTabsStore from '../../stores/Navigation/createTabsStore';
import type { TabsState } from '../../stores/Navigation/TabState';
import createTrapSpaceSDStatusStore from '../../stores/TrapSpaceSuccessionDiagram/createTrapSpaceSDStatusStore';
import type { TrapSpaceSDStatusState } from '../../stores/TrapSpaceSuccessionDiagram/TrapSpaceSDStatusState';
import createUndoRedoStore from '../../stores/UndoRedo/createUndoRedoStore';
import type { UndoRedoState } from '../../stores/UndoRedo/UndoRedoState';
import createWarningStore from '../../stores/Warning/createWarningStore';
import type { WarningState } from '../../stores/Warning/WarningState';
import type { ZustandStore } from '../../stores/ZustandStoreType';
import type { StoresProviderInt } from './StoresProviderInt';

class StoresProvider implements StoresProviderInt {
  // #region --- Page Status Stores ---

  public bifurcationExplorerStatusStore: ZustandStore<BifurcationExplorerStatusState>;
  public attractorVisualizerStatusStore: ZustandStore<AttractorVisualizerStatusState>;
  public modelEditorStatusStore: ZustandStore<ModelEditorStatus>;
  public perturbationFiltersSortStore: ZustandStore<PerturbationFiltersSortState>;
  public trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>;

  // #endregion

  // #region --- Computation Manager ---

  public computeEngineStatusStore: ZustandStore<ComputeEngineStatusState>;
  public resultsStatusStore: ZustandStore<ResultsStatus>;

  // #endregion

  // #region --- Global Stores ---

  public tabsStore: ZustandStore<TabsState>;
  public warningStore: ZustandStore<WarningState>;
  public overlayWindowStore: ZustandStore<OverlayWindowState>;
  public helpHoverStore: ZustandStore<HelpHoverState>;

  // #endregion

  // #region --- Live Model ---

  public loadedModelStore: ZustandStore<ModelState>;
  public modelInfoStore: ZustandStore<ModelInfoState>;
  public variablesStore: ZustandStore<VariablesStatus>;
  public variablePositionsStore: ZustandStore<VariablePositionsState>;
  public regulationsStore: ZustandStore<RegulationsStatus>;
  public updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
  public controlStore: ZustandStore<ControlStatus>;

  // #endregion

  // #region --- Undo/Redo stores ---

  public modelUndoRedoStore: ZustandStore<UndoRedoState>;

  // #endregion

  constructor() {
    this.bifurcationExplorerStatusStore =
      createBifurcationExplorerStatusStore();
    this.attractorVisualizerStatusStore =
      createAttractorVisualizerStatusStore();
    this.modelEditorStatusStore = createModelEditorStatusStore();
    this.perturbationFiltersSortStore = createPerturbationFilterSortStore();
    this.trapSpaceSDStatusStore = createTrapSpaceSDStatusStore();

    this.computeEngineStatusStore = createComputeEngineStatusStore();
    this.resultsStatusStore = createResultsStatusStore();

    this.tabsStore = createTabsStore();
    this.warningStore = createWarningStore();
    this.overlayWindowStore = createOverlayWindowStore();
    this.helpHoverStore = createHelpHoverStore();

    this.loadedModelStore = createLoadedModelStore();
    this.modelInfoStore = createModelInfoStore();
    this.variablesStore = createVariablesStore();
    this.variablePositionsStore = createVariablePositionsStore();
    this.regulationsStore = createRegulationsStore();
    this.updateFunctionsStore = createUpdateFunctionsStore(this.variablesStore);
    this.controlStore = createControlStore();

    this.modelUndoRedoStore = createUndoRedoStore();
  }

  initializeUndoRedoStore(messageServ: MessageInt) {
    this.modelUndoRedoStore.getState().setMessageFunctions(
      (message: string) => messageServ.showSuccess(message),
      (message: string) => messageServ.showError(message)
    );
  }
}

export default StoresProvider;
