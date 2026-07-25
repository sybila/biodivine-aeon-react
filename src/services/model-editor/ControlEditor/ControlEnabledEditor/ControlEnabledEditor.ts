import type { ControlStatus } from '../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type { LiveModelInt } from '../../../global/LiveModel/LiveModelInt';
import type { ModelVisualizationInt } from '../../ModelVisualization/ModelVisualizationInt';
import ControlEditor from '../ControlEditor';
import type { ControlEnabledEditorInt } from './ControlEnabledEditorInt';

class ControlEnabledEditor
  extends ControlEditor
  implements ControlEnabledEditorInt
{
  // #region --- Properties + Constructor ---

  private liveModelServ: LiveModelInt;

  private controlStore: ZustandStore<ControlStatus>;
  private variablesStore: ZustandStore<VariablesStatus>;

  constructor(
    modelVisualizationServ: ModelVisualizationInt,
    liveModelServ: LiveModelInt,
    controlStore: ZustandStore<ControlStatus>,
    variablesStore: ZustandStore<VariablesStatus>,
    modelEditorStatusStore: ZustandStore<ModelEditorStatus>
  ) {
    super(modelVisualizationServ, modelEditorStatusStore);

    this.liveModelServ = liveModelServ;
    this.controlStore = controlStore;
    this.variablesStore = variablesStore;
  }

  // #endregion

  /** Changes the control enabled state of a variable by its ID */
  public changeControlEnabled(id: number, enabled: boolean) {
    this.liveModelServ.Control.changeControlEnabledById(
      id,
      enabled,
      true,
      false
    );
  }

  /** Toggles the control enabled state of a variable by its ID */
  public toggleControlEnabled(id: number) {
    const varControlEnabled: boolean | undefined = this.controlStore
      .getState()
      .getVariableControlEnabled(id);

    if (varControlEnabled != undefined) {
      this.liveModelServ.Control.changeControlEnabledById(
        id,
        !varControlEnabled,
        true,
        false
      );
    }
  }

  /** Changes the control enabled state of selected variables.
   *  @param selectedVariables - Set of variable IDs:
   *  @param controlEnabled - The new control enabled state to set (true or false)
   *  Only variables that are marked as selected (true) will have their control enabled state changed.
   *  Variables not present in the selectedVariables array are considered not selected and will be ignored.
   *  If a variable name does not correspond to any existing variable, it will be ignored.
   */
  public changeControlEnabledSelected(
    selectedVariables: Set<number>,
    controlEnabled: boolean
  ) {
    selectedVariables.forEach((variableId) => {
      const variable = this.variablesStore
        .getState()
        .variableFromId(variableId);
      if (!variable) return;

      this.changeControlEnabled(variableId, controlEnabled);
    });
  }
}

export default ControlEnabledEditor;
