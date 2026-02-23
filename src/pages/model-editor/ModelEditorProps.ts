import type { ComputationManagerInt } from '../../services/global/ComputationManager/ComputationManagerInt';
import type { LiveModelInt } from '../../services/global/LiveModel/LiveModelInt';
import type { ControlEditorInt } from '../../services/model-editor/ControlEditor/ControlEditorInt';
import type { ModelEditorInt } from '../../services/model-editor/ModelEditor/ModelEditorInt';
import type { ModelVisualizationInt } from '../../services/model-editor/ModelVisualization/ModelVisualizationInt';
import type { ResultsStatus } from '../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { ControlStatus } from '../../stores/LiveModel/ControlStore/ControlStatus';
import type { ModelInfoState } from '../../stores/LiveModel/ModelInfoStore/ModelInfoState';
import type { RegulationsStatus } from '../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { UpdateFunctionsState } from '../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../stores/ModelEditor/ModelEditorStatus';
import type { TabsState } from '../../stores/Navigation/TabState';
import type { ZustandStore } from '../../stores/ZustandStoreType';

export type ModelEditorProps = {
  // # region --- Services ---

  liveModelServ: LiveModelInt;
  modelVisualization: ModelVisualizationInt;
  modelEditorServ: ModelEditorInt;
  controlEditorServ: ControlEditorInt;
  computationManagerServ: ComputationManagerInt;

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

  // # endregion
};
