import type { LiveModelInt } from '../../services/global/LiveModel/LiveModelInt';
import type { MessageInt } from '../../services/global/Message/MessageInt';
import ControlEditor from '../../services/model-editor/ControlEditor/ControlEditor';
import type { ControlEditorInt } from '../../services/model-editor/ControlEditor/ControlEditorInt';
import ModelEditor from '../../services/model-editor/ModelEditor/ModelEditor';
import type { ModelEditorInt } from '../../services/model-editor/ModelEditor/ModelEditorInt';
import CytoscapeME from '../../services/model-editor/ModelVisualization/CytoscapeME';
import type { ModelVisualizationInt } from '../../services/model-editor/ModelVisualization/ModelVisualizationInt';
import type { StoresProviderInt } from '../StoresProvider/StoresProviderInt';
import type { ModelEditorServicesProviderInt } from './ModelEditorServicesProviderInt';

class ModelEditorServicesProvider implements ModelEditorServicesProviderInt {
  public controlEditorServ: ControlEditorInt;
  public modelEditorServ: ModelEditorInt;
  public modelVisualizationServ: ModelVisualizationInt;

  constructor(
    liveModelServ: LiveModelInt,
    messageServ: MessageInt,
    storesProvider: StoresProviderInt
  ) {
    this.modelVisualizationServ = new CytoscapeME(
      liveModelServ,
      storesProvider.controlStore,
      storesProvider.modelEditorStatusStore
    );
    this.modelEditorServ = new ModelEditor(
      this.modelVisualizationServ,
      liveModelServ,
      messageServ,
      storesProvider.overlayWindowStore,
      storesProvider.regulationsStore,
      storesProvider.variablesStore,
      storesProvider.updateFunctionsStore,
      storesProvider.modelEditorStatusStore
    );
    this.controlEditorServ = new ControlEditor(
      this.modelVisualizationServ,
      liveModelServ,
      storesProvider.controlStore,
      storesProvider.variablesStore,
      storesProvider.modelEditorStatusStore
    );
  }
}

export default ModelEditorServicesProvider;
