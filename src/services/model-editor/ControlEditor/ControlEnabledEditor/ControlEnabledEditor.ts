import type { ControlStatus } from '../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type { LiveModelInt } from '../../../global/LiveModel/LiveModelInt';
import type { MessageInt } from '../../../global/Message/MessageInt';
import type { ModelVisualizationInt } from '../../ModelVisualization/ModelVisualizationInt';
import ControlEditor from '../ControlEditor';
import type { ControlEnabledEditorInt } from './ControlEnabledEditorInt';

class ControlEnabledEditor
  extends ControlEditor
  implements ControlEnabledEditorInt
{
  // #region --- Properties + Constructor ---

  private liveModelServ: LiveModelInt;
  private messageServ: MessageInt;

  private controlStore: ZustandStore<ControlStatus>;
  private variablesStore: ZustandStore<VariablesStatus>;

  constructor(
    modelVisualizationServ: ModelVisualizationInt,
    liveModelServ: LiveModelInt,
    messageServ: MessageInt,
    controlStore: ZustandStore<ControlStatus>,
    variablesStore: ZustandStore<VariablesStatus>,
    modelEditorStatusStore: ZustandStore<ModelEditorStatus>
  ) {
    super(modelVisualizationServ, modelEditorStatusStore);

    this.liveModelServ = liveModelServ;
    this.messageServ = messageServ;
    this.controlStore = controlStore;
    this.variablesStore = variablesStore;
  }

  // #endregion

  public changeControlEnabled(id: number, enabled: boolean) {
    return this.liveModelServ.Control.changeControlEnabledById(
      id,
      enabled,
      true,
      false
    );
  }

  public toggleControlEnabled(id: number) {
    const varControlEnabled: boolean | undefined = this.controlStore
      .getState()
      .getVariableControlEnabled(id);

    return this.liveModelServ.Control.changeControlEnabledById(
      id,
      !varControlEnabled,
      true,
      false
    );
  }

  public changeControlEnabledSelected(
    selectedVariables: Set<number>,
    controlEnabled: boolean
  ) {
    selectedVariables.forEach((variableId) => {
      const variable = this.variablesStore
        .getState()
        .variableFromId(variableId);
      if (!variable) return;

      this.messageServ.showFromResult(
        this.changeControlEnabled(variableId, controlEnabled),
        `Failed to change control-enabled state for ${variable.name}`
      );
    });
  }
}

export default ControlEnabledEditor;
