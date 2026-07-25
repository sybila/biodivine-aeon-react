import type { LiveModelInt } from '../../services/global/LiveModel/LiveModelInt';
import type { MessageInt } from '../../services/global/Message/MessageInt';
import type { StringProviderInt } from '../../services/global/StringProvider/StringProviderInt';
import ControlEnabledEditor from '../../services/model-editor/ControlEditor/ControlEnabledEditor/ControlEnabledEditor';
import type { ControlEnabledEditorInt } from '../../services/model-editor/ControlEditor/ControlEnabledEditor/ControlEnabledEditorInt';
import PhenotypeEditor from '../../services/model-editor/ControlEditor/PhenotypeEditor/PhenotypeEditor';
import type { PhenotypeEditorInt } from '../../services/model-editor/ControlEditor/PhenotypeEditor/PhenotypeEditorInt';
import ModelEditor from '../../services/model-editor/ModelEditor/ModelEditor';
import type { ModelEditorInt } from '../../services/model-editor/ModelEditor/ModelEditorInt';
import CytoscapeME from '../../services/model-editor/ModelVisualization/CytoscapeME';
import type { ModelVisualizationInt } from '../../services/model-editor/ModelVisualization/ModelVisualizationInt';
import type { StoresProviderInt } from '../StoresProvider/StoresProviderInt';
import type { ModelEditorServicesProviderInt } from './ModelEditorServicesProviderInt';

class ModelEditorServicesProvider implements ModelEditorServicesProviderInt {
  public controlEnabledEditorServ: ControlEnabledEditorInt;
  public phenotypeEditorServ: PhenotypeEditorInt;
  public modelEditorServ: ModelEditorInt;
  public modelVisualizationServ: ModelVisualizationInt;

  constructor(
    liveModelServ: LiveModelInt,
    stringProviderServ: StringProviderInt,
    messageServ: MessageInt,
    storesProvider: StoresProviderInt
  ) {
    this.modelVisualizationServ = new CytoscapeME(
      liveModelServ,
      messageServ,
      storesProvider.controlStore,
      storesProvider.modelEditorStatusStore,
      storesProvider.modelUndoRedoStore,
      storesProvider.variablePositionsStore
    );
    this.modelEditorServ = new ModelEditor(
      this.modelVisualizationServ,
      liveModelServ,
      stringProviderServ,
      messageServ,
      storesProvider.overlayWindowStore,
      storesProvider.regulationsStore,
      storesProvider.variablesStore,
      storesProvider.updateFunctionsStore,
      storesProvider.modelEditorStatusStore,
      storesProvider.helpHoverStore
    );
    this.controlEnabledEditorServ = new ControlEnabledEditor(
      this.modelVisualizationServ,
      liveModelServ,
      storesProvider.controlStore,
      storesProvider.variablesStore,
      storesProvider.modelEditorStatusStore
    );
    this.phenotypeEditorServ = new PhenotypeEditor(
      this.modelVisualizationServ,
      liveModelServ,
      storesProvider.controlStore,
      storesProvider.variablesStore,
      storesProvider.modelEditorStatusStore
    );
  }
}

export default ModelEditorServicesProvider;
