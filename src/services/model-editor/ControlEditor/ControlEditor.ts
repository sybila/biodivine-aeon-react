import type { ControlStatus } from '../../../stores/LiveModel/ControlStore/ControlStatus';
import useControlStore from '../../../stores/LiveModel/ControlStore/useControlStore';
import useVariablesStore from '../../../stores/LiveModel/VariablesStore/useVariablesStore';
import type { VariablesStatus } from '../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../../stores/ModelEditor/ModelEditorStatus';
import useModelEditorStatus from '../../../stores/ModelEditor/useModelEditorStatus';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import type { ControlInfo, Oscillation, Phenotype } from '../../../types';
import { LiveModel } from '../../global/LiveModel/LiveModel';
import type { LiveModelInt } from '../../global/LiveModel/LiveModelInt';
import CytoscapeME from '../ModelVisualization/CytoscapeME';
import type { ModelVisualizationInt } from '../ModelVisualization/ModelVisualizationInt';
import type { ControlEditorInt } from './ControlEditorInt';

class ControlEditorClass implements ControlEditorInt {
  // #region --- Properties + Constructor ---

  /** Record containing all selected variables in the ControlEditorTabContent.tsx component.
   *  Key: variable name
   *  Value: whether the variable is selected or not (true = selected, false = not selected)
   *  If variables is missing from the record, it is considered not selected (false).
   */
  private selectedVariables: Record<string, boolean> = {};

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

  /** Sets record of currently selected variables in the ControlEditorTabContent.tsx component.
   *  Key: variable name
   *  Value: whether the variable is selected or not (true = selected, false = not selected)
   *  If variables is missing from the record, it is considered not selected (false).
   */
  public setSelectVariables(newSelected: Record<string, boolean>) {
    this.selectedVariables = newSelected;
  }

  /** Returns all currently selected variables in the ControlEditorTabContent.tsx component.
   * Key: variable name
   * Value: whether the variable is selected or not (true = selected, false = not selected)
   * If variables is missing from the record, it is considered not selected (false).
   */
  public getSelectedVariables(): Record<string, boolean> {
    return this.selectedVariables;
  }

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
    this.liveModelServ.Control.changeControlEnabledById(id, enabled);
  }

  /** Toggles the control enabled state of a variable by its ID */
  public toggleControlEnabled(id: number) {
    const controlInfo: ControlInfo | undefined = this.controlStore
      .getState()
      .getVariableControlInfo(id);

    if (controlInfo) {
      this.liveModelServ.Control.changeControlEnabledById(
        id,
        !controlInfo.controlEnabled
      );
    }
  }

  /** Changes the control enabled state of selected variables.
   *  @param selectedVariables - Array of tuples where each tuple contains:
   *    - variable name (string)
   *    - whether the variable is selected (boolean)
   *  @param controlEnabled - The new control enabled state to set (true or false)
   *  Only variables that are marked as selected (true) will have their control enabled state changed.
   *  Variables not present in the selectedVariables array are considered not selected and will be ignored.
   *  If a variable name does not correspond to any existing variable, it will be ignored.
   */
  public changeControlEnabledSelected(
    selectedVariables: Array<[string, boolean]>,
    controlEnabled: boolean
  ) {
    selectedVariables.forEach(([varName, isSelected]) => {
      if (!isSelected) return;

      const variableId = this.variablesStore
        .getState()
        .variableFromName(varName)?.id;

      if (variableId != undefined && variableId !== null) {
        this.changeControlEnabled(variableId, controlEnabled);
      }
    });
  }

  // #endregion

  // #region --- Phenotype Actions ---

  /** Changes the phenotype state of a variable by its ID */
  public changePhenotype(id: number, phenotype: Phenotype) {
    this.liveModelServ.Control.changePhenotypeById(id, phenotype);
  }

  /** Toggles the phenotype state of a variable by its ID */
  public togglePhenotype(id: number) {
    const controlInfo: ControlInfo | undefined = this.controlStore
      .getState()
      .getVariableControlInfo(id);

    if (!controlInfo) return;

    switch (controlInfo.phenotype) {
      case true:
        this.liveModelServ.Control.changePhenotypeById(id, false);
        break;
      case false:
        this.liveModelServ.Control.changePhenotypeById(id, null);
        break;
      default:
        this.liveModelServ.Control.changePhenotypeById(id, true);
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
    selectedVariables: Array<[string, boolean]>,
    phenotype: Phenotype
  ) {
    selectedVariables.forEach(([varName, isSelected]) => {
      if (!isSelected) return;

      const variableId = this.variablesStore
        .getState()
        .variableFromName(varName)?.id;

      if (variableId != undefined && variableId !== null) {
        this.changePhenotype(variableId, phenotype);
      }
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
  public hoverVariableCytoscape(id: number, turnOnHover: boolean) {
    this.modelVisualizationServ.hoverNode(id, turnOnHover);
  }

  // #endregion
}

/** Singleton for controlling the behavior of the Control Editor */
const ControlEditor: ControlEditorClass = new ControlEditorClass(
  CytoscapeME,
  LiveModel,
  useControlStore,
  useVariablesStore,
  useModelEditorStatus
);

export default ControlEditor;
