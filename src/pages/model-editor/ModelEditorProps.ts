import type { ComputationManagerInt } from '../../services/global/ComputationManager/ComputationManagerInt';
import type { LiveModelInt } from '../../services/global/LiveModel/LiveModelInt';
import type { LoadingInt } from '../../services/global/Loading/LoadingInt';
import type { MessageInt } from '../../services/global/Message/MessageInt';
import type { ResultsOperationsInt } from '../../services/global/ResultsOperations/ResultsOperationsInt';
import type { WarningInt } from '../../services/global/Warning/WarningInt';
import type { ControlEditorInt } from '../../services/model-editor/ControlEditor/ControlEditorInt';
import type { ModelEditorInt } from '../../services/model-editor/ModelEditor/ModelEditorInt';
import type { ModelVisualizationInt } from '../../services/model-editor/ModelVisualization/ModelVisualizationInt';
import type { FileConvertorsInt } from '../../services/utilities/FileConvertors/FileConvertorsInt';
import type { SearchAndFilterHelpersInt } from '../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import type { ResultsStatus } from '../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { ControlStatus } from '../../stores/LiveModel/ControlStore/ControlStatus';
import type { ModelState } from '../../stores/LiveModel/LoadedModelStore/ModelState';
import type { ModelInfoState } from '../../stores/LiveModel/ModelInfoStore/ModelInfoState';
import type { RegulationsStatus } from '../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { UpdateFunctionsState } from '../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../stores/ModelEditor/ModelEditorStatus';
import type { TabsState } from '../../stores/Navigation/TabState';
import type { UndoRedoState } from '../../stores/UndoRedo/UndoRedoState';
import type { ZustandStore } from '../../stores/ZustandStoreType';

export type ModelEditorProps = {
  // # region --- Services ---

  liveModelServ: LiveModelInt;
  modelVisualization: ModelVisualizationInt;
  modelEditorServ: ModelEditorInt;
  controlEditorServ: ControlEditorInt;
  computationManagerServ: ComputationManagerInt;
  searchAndFilterHelpersServ: SearchAndFilterHelpersInt;
  fileConvertorsServ: FileConvertorsInt;
  warningServ: WarningInt;
  messageServ: MessageInt;
  loadingServ: LoadingInt;

  // # endregion

  // # region --- Zustand Stores ---

  modelEditorStatusStore: ZustandStore<ModelEditorStatus>;
  tabStore: ZustandStore<TabsState>;
  resultsStatusStore: ZustandStore<ResultsStatus>;
  controlStore: ZustandStore<ControlStatus>;
  regulationsStore: ZustandStore<RegulationsStatus>;
  variablesStore: ZustandStore<VariablesStatus>;
  updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
  modelInfoStore: ZustandStore<ModelInfoState>;
  loadedModelStore: ZustandStore<ModelState>;
  modelUndoRedoStore: ZustandStore<UndoRedoState>;

  // # endregion
};
