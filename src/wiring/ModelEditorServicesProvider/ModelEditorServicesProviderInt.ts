import type { ControlEditorInt } from '../../services/model-editor/ControlEditor/ControlEditorInt';
import type { ModelEditorInt } from '../../services/model-editor/ModelEditor/ModelEditorInt';
import type { ModelVisualizationInt } from '../../services/model-editor/ModelVisualization/ModelVisualizationInt';

/** Interface which defines provider of model editor page services. */
export interface ModelEditorServicesProviderInt {
  controlEditorServ: ControlEditorInt;
  modelEditorServ: ModelEditorInt;
  modelVisualizationServ: ModelVisualizationInt;
}
