import type { ControlEditorInt } from '../../services/model-editor/ControlEditor/ControlEditorInt';
import type { ModelVisualizationInt } from '../../services/model-editor/ModelVisualization/ModelVisualizationInt';
import type { ModelEditorStatus } from '../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../stores/ZustandStoreType';

export type ModelEditorProps = {
  modelVisualization: ModelVisualizationInt;
  controlEditorServ: ControlEditorInt;
  modelEditorStatusStore: ZustandStore<ModelEditorStatus>;
};
