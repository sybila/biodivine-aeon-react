import type { BifurcationExplorerStatusState } from '../../stores/AttractorBifurcationExplorer/BifurcationExplorerStatusState';
import type { AttractorVisualizerStatusState } from '../../stores/AttractorVisualizer/AttractorVisualizerStatusState';
import type { ComputeEngineStatusState } from '../../stores/ComputationManager/ComputeEngineStatusStore/ComputeEngineStatusState';
import type { ResultsStatus } from '../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { OverlayWindowState } from '../../stores/ContentOverlayWindow/OverlayWindowState';
import type { PerturbationFiltersSortState } from '../../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/PerturbationsFilterSortState';
import type { HelpHoverState } from '../../stores/HelpHover/HelpHoverState';
import type { ControlStatus } from '../../stores/LiveModel/ControlStore/ControlStatus';
import type { ModelState } from '../../stores/LiveModel/LoadedModelStore/ModelState';
import type { ModelInfoState } from '../../stores/LiveModel/ModelInfoStore/ModelInfoState';
import type { RegulationsStatus } from '../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { UpdateFunctionsState } from '../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablePositionsState } from '../../stores/LiveModel/VariablePositions/VariablePostionsState';
import type { VariablesStatus } from '../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../stores/ModelEditor/ModelEditorStatus';
import type { TabsState } from '../../stores/Navigation/TabState';
import type { TrapSpaceSDStatusState } from '../../stores/TrapSpaceSuccessionDiagram/TrapSpaceSDStatusState';
import type { UndoRedoState } from '../../stores/UndoRedo/UndoRedoState';
import type { WarningState } from '../../stores/Warning/WarningState';
import type { ZustandStore } from '../../stores/ZustandStoreType';

/** Interface which defines provider for all stores used inside the app. */
export interface StoresProviderInt {
  // #region --- Page Status Stores ---

  bifurcationExplorerStatusStore: ZustandStore<BifurcationExplorerStatusState>;
  attractorVisualizerStatusStore: ZustandStore<AttractorVisualizerStatusState>;
  modelEditorStatusStore: ZustandStore<ModelEditorStatus>;
  perturbationFiltersSortStore: ZustandStore<PerturbationFiltersSortState>;
  trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>;

  // #endregion

  // #region --- Computation Manager ---

  computeEngineStatusStore: ZustandStore<ComputeEngineStatusState>;
  resultsStatusStore: ZustandStore<ResultsStatus>;

  // #endregion

  // #region --- Global Stores ---

  tabsStore: ZustandStore<TabsState>;
  warningStore: ZustandStore<WarningState>;
  overlayWindowStore: ZustandStore<OverlayWindowState>;
  helpHoverStore: ZustandStore<HelpHoverState>;

  // #endregion

  // #region --- Live Model ---

  loadedModelStore: ZustandStore<ModelState>;
  modelInfoStore: ZustandStore<ModelInfoState>;
  variablesStore: ZustandStore<VariablesStatus>;
  variablePositionsStore: ZustandStore<VariablePositionsState>;
  regulationsStore: ZustandStore<RegulationsStatus>;
  updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
  controlStore: ZustandStore<ControlStatus>;

  // #endregion

  // #region --- Undo/Redo stores ---

  modelUndoRedoStore: ZustandStore<UndoRedoState>;

  // #endregion
}
