import type { ComputationManagerInt } from '../../services/global/ComputationManager/ComputationManagerInt';
import type { ControlEditorInt } from '../../services/model-editor/ControlEditor/ControlEditorInt';
import type { ModelEditorInt } from '../../services/model-editor/ModelEditor/ModelEditorInt';
import type { ModelVisualizationInt } from '../../services/model-editor/ModelVisualization/ModelVisualizationInt';
import type { ResultsStatus } from '../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { ModelEditorStatus } from '../../stores/ModelEditor/ModelEditorStatus';
import type { TabsState } from '../../stores/Navigation/TabState';
import type { ZustandStore } from '../../stores/ZustandStoreType';

export type ModelEditorProps = {
  // # region --- Services ---

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

  // # endregion
};
