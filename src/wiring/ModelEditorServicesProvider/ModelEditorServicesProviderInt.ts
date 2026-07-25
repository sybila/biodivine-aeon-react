import type { ControlEnabledEditorInt } from '../../services/model-editor/ControlEditor/ControlEnabledEditor/ControlEnabledEditorInt';
import type { PhenotypeEditorInt } from '../../services/model-editor/ControlEditor/PhenotypeEditor/PhenotypeEditorInt';
import type { ModelEditorInt } from '../../services/model-editor/ModelEditor/ModelEditorInt';
import type { ModelVisualizationInt } from '../../services/model-editor/ModelVisualization/ModelVisualizationInt';

/** Interface which defines provider of model editor page services. */
export interface ModelEditorServicesProviderInt {
  controlEnabledEditorServ: ControlEnabledEditorInt;
  phenotypeEditorServ: PhenotypeEditorInt;
  modelEditorServ: ModelEditorInt;
  modelVisualizationServ: ModelVisualizationInt;
}
