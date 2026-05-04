import type { ControlStatus } from '../../../stores/LiveModel/ControlStore/ControlStatus';
import type { VariablesStatus } from '../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import type { ControlInfo, Oscillation, Phenotype } from '../../../types';
import type { LiveModelInt } from '../../global/LiveModel/LiveModelInt';
import type { ModelVisualizationInt } from '../ModelVisualization/ModelVisualizationInt';
import type { ControlEditorInt } from './ControlEditorInt';

class ControlEditor implements ControlEditorInt {
  // #region --- Properties + Constructor ---

  /** Currently searched variable name in the ControlEditorTabContent.tsx component */
  private variableSearch: string = '';

  private modelVisualizationServ: ModelVisualizationInt;
  private liveModelServ: LiveModelInt;

  private controlStore: ZustandStore<ControlStatus>;
  private variablesStore: ZustandStore<VariablesStatus>;
  private modelEditorStatusStore: ZustandStore<ModelEditorStatus>;

  constructor(
    modelVisualizationServ: ModelVisualizationInt,
    liveModelServ: LiveModelInt,
    controlStore: ZustandStore<ControlStatus>,
    variablesStore: ZustandStore<VariablesStatus>,
    modelEditorStatusStore: ZustandStore<ModelEditorStatus>
  ) {
    this.modelVisualizationServ = modelVisualizationServ;
    this.liveModelServ = liveModelServ;
    this.controlStore = controlStore;
    this.variablesStore = variablesStore;
    this.modelEditorStatusStore = modelEditorStatusStore;
  }

  // #endregion

  // #region --- Hover/Select Variable Functions ---

  /** Toggles hover state on a variable in the ControlEditorTabContent.tsx component
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   * (you must first set hoverVariableInfo with setHoverVariableFunction before running this function)
   */
  public hoverVariable(id: number, turnOnHover: boolean) {
    this.modelEditorStatusStore
      .getState()
      .setHoverItemInfo(turnOnHover ? { type: 'variable', id } : null);
  }

  // #endregion

  // #region --- Variable Search ---

  /** Returns last searched variable name in the ControlEditorTabContent.tsx component */
  public getVariableSearch(): string {
    return this.variableSearch;
  }

  /** Sets currently searched variable name in the ControlEditorTabContent.tsx component */
  public setVariableSearch(name: string) {
    this.variableSearch = name;
  }

  // #endregion

  // #region --- Control Enabled Actions ---

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
    const controlInfo: ControlInfo | undefined = this.controlStore
      .getState()
      .getVariableControlInfo(id);

    if (controlInfo) {
      this.liveModelServ.Control.changeControlEnabledById(
        id,
        !controlInfo.controlEnabled,
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

  // #endregion

  // #region --- Phenotype Actions ---

  /** Changes the phenotype state of a variable by its ID */
  public changePhenotype(id: number, phenotype: Phenotype) {
    this.liveModelServ.Control.changePhenotypeById(id, phenotype, true, false);
  }

  /** Toggles the phenotype state of a variable by its ID */
  public togglePhenotype(id: number) {
    const controlInfo: ControlInfo | undefined = this.controlStore
      .getState()
      .getVariableControlInfo(id);

    if (!controlInfo) return;

    switch (controlInfo.phenotype) {
      case true:
        this.liveModelServ.Control.changePhenotypeById(id, false, true, false);
        break;
      case false:
        this.liveModelServ.Control.changePhenotypeById(id, null, true, false);
        break;
      default:
        this.liveModelServ.Control.changePhenotypeById(id, true, true, false);
    }
  }

  /** Changes the phenotype state of selected variables.
   *  @param selectedVariables - Array of tuples where each tuple contains:
   *    - variable name (string)
   *    - whether the variable is selected (boolean)
   *  @param phenotype - The new phenotype state to set (true, false, or null)
   *  Only variables that are marked as selected (true) will have their phenotype state changed.
   *  Variables not present in the selectedVariables array are considered not selected and will be ignored.
   *  If a variable name does not correspond to any existing variable, it will be ignored.
   */
  public changePhenotypeSelected(
    selectedVariables: Set<number>,
    phenotype: Phenotype
  ) {
    selectedVariables.forEach((variableId) => {
      const variable = this.variablesStore
        .getState()
        .variableFromId(variableId);
      if (!variable) return;

      this.changePhenotype(variableId, phenotype);
    });
  }

  // #endregion

  // #region --- Phenotype Oscillation Getter/Setter ---

  /** Returns the currently set phenotype oscillation state in the ControlEditorTabContent.tsx component */
  public getPhenotypeOscillation(): Oscillation {
    return this.liveModelServ.Control.getOscillation();
  }

  /** Sets the currently set phenotype oscillation state in the ControlEditorTabContent.tsx component */
  public setPhenotypeOscillation(newOscillation: Oscillation) {
    this.liveModelServ.Control.setOscillation(newOscillation);
  }

  // #endregion

  // #region --- Cytoscape Actions ---

  /** Toggles hover state on a variable node in the CytoscapeMe canvas.
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   */
  public hoverVariableVisualization(id: number, turnOnHover: boolean) {
    this.modelVisualizationServ.hoverNode(id, turnOnHover);
  }

  /** Toggles selection state on a variable node in the modelVisualizationServ canvas.
   *  If `turnOnSelect` is true, it selects the node; if false, it unselects it.
   */
  public selectVariableVisualization(id: number, turnOnSelect: boolean) {
    if (turnOnSelect) {
      this.modelVisualizationServ.selectNode(id);
    } else {
      this.modelVisualizationServ.unselectNode(id);
    }
  }

  /** Unselects all items selected in the model visualization canvas. */
  public unselectAllVisualization() {
    this.modelVisualizationServ.unselectAll();
  }

  // #endregion
}

export default ControlEditor;
