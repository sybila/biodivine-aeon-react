import type { ModelStats, Variable } from '../../../types';
import { LiveModel } from '../../global/LiveModel/LiveModel';
import CytoscapeME from '../CytoscapeME/CytoscapeME';

/**
	Responsible for managing the UI of the model editor, i.e. adding/removing variables and regulations, focusing
	right elements when needed, etc.
*/
class ModelEditorClass {
  /** Function for reloading the ModelEditorTabContent.tsx component */
  private reloadEditorTab: (() => void) | null = null;

  /** Function for toggling hover state of variables in the ModelEditorTabContent.tsx component */
  private hoverVariableInfo:
    | ((id: number, turnOnHover: boolean) => void)
    | null = null;

  /** Function for toggling selected state of variables in the ModelEditorTabContent.tsx component */
  private selectVariableInfo: ((id: number, select: boolean) => void) | null =
    null;

  /** Sets reload function for the ModelEditorTabContent.tsx (needs to be called before reloadModelEditorTab function) */
  public setReloadFunction(reloadFunction: () => void) {
    this.reloadEditorTab = reloadFunction;
  }

  /** Currently selected variable in the ModelEditorCanvas.tsx component */
  private selectedVariableId: number | null = null;

  /** Currently searched variable name in the ModelEditorTabContent.tsx component */
  private variableSearch: string = '';

  /** Changes the name of a variable */
  public changeVariableName(id: number, newName: string) {
    if (newName != '') LiveModel.Variables.renameVariable(id, newName);
  }

  /** Returns last selected variable id in the ModelEditorCanvas.tsx component. Returns null if no variable is selected */
  public getSelectedVariableId(): number | null {
    return this.selectedVariableId;
  }

  /** Sets currently selected variable id in the ModelEditorCanvas.tsx component. id is null if no variable is selected */
  public setSelectedVariableId(id: number | null) {
    this.selectedVariableId = id;
  }

  /** Returns last searched variable name in the ModelEditorTabContent.tsx component */
  public getVariableSearch(): string {
    return this.variableSearch;
  }

  /** Sets currently searched variable name in the ModelEditorTabContent.tsx component */
  public setVariableSearch(name: string) {
    this.variableSearch = name;
  }

  /** Function which enforces reload of the ModelEditorTabContent.tsx component
   * (you must first set reloadEditorTab with setReloadFunction before running this function) */
  public reloadModelEditorTab() {
    if (this.reloadEditorTab) {
      this.reloadEditorTab();
    }
  }

  /** Sets hover function for variables inside the ModelEditorTabContent.tsx (needs to be called before hoverVariable function) */
  public setHoverVariableFunction(
    hoverFunction: (id: number, turnOnHover: boolean) => void
  ) {
    this.hoverVariableInfo = hoverFunction;
  }

  /** Toggles hover state on a variable in the ModelEditorTabContent.tsx component
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   * (you must first set hoverVariableInfo with setHoverVariableFunction before running this function)
   */
  public hoverVariable(id: number, turnOnHover: boolean) {
    if (this.hoverVariableInfo) {
      this.hoverVariableInfo(id, turnOnHover);
    }
  }

  /** Sets select function for variables inside the ModelEditorTabContent.tsx (needs to be called before selectVariable function) */
  public setSelectVariableFunction(
    selectFunction: (id: number, select: boolean) => void
  ) {
    this.selectVariableInfo = selectFunction;
  }

  /** Toggles selected state on a variable in the ModelEditorTabContent.tsx component
   * If `select` is true, it sets variable as selected; if false, it unselects it.
   * (you must first set selectVariableInfo with setSelectVariableFunction before running this function)
   */
  public selectVariable(id: number, select: boolean) {
    if (this.selectVariableInfo) {
      this.setSelectedVariableId(select ? id : null);
      this.selectVariableInfo(id, select);
    }
  }

  /** Toggles hover state on a variable node in the CytoscapeMe canvas.
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   * (you must first set reloadEditorTab with setReloadFunction before running this function)
   */
  public hoverVariableCytoscape(id: number, turnOnHover: boolean) {
    CytoscapeME.hoverNode(id, turnOnHover);
  }

  /** Finds variable in the CytoscapeMe canvas nad zooms on it */
  public zoomOnVariable(id: number) {
    CytoscapeME.showNode(id);
  }

  public removeVariable(id: number) {
    LiveModel.Variables.removeVariable(id);
  }

  public toggleRegulationMonocity(regulatorId: number, targetId: number): void {
    LiveModel.Regulations.toggleMonotonicity(regulatorId, targetId);
  }

  public toggleRegulationObservability(regulatorId: number, targetId: number) {
    LiveModel.Regulations.toggleObservability(regulatorId, targetId);
  }

  /** Sets update function for a variable in the ModelEditorTabContent.tsx component */
  public setUpdateFunction(
    id: number,
    updateFunction: string
  ): string | undefined {
    return LiveModel.UpdateFunctions.setUpdateFunction(id, updateFunction);
  }

  /**  Returns update function for a variable in the ModelEditorTabContent.tsx component. */
  public getUpdateFunction(id: number): string | undefined {
    const updateFunction = LiveModel.UpdateFunctions.getUpdateFunctionId(id);

    if (!updateFunction) return undefined;

    return updateFunction.functionString;
  }

  public getModelStats(): ModelStats {
    return LiveModel.Export.stats();
  }

  public getAllVariables(): Variable[] {
    return LiveModel.Variables.getAllVariables();
  }

  public getVariableById(id: number): Variable | undefined {
    return LiveModel.Variables.variableFromId(id);
  }

  public getVariableRegulators(id: number) {
    return LiveModel.Regulations.regulationsOf(id);
  }
}

const ModelEditor: ModelEditorClass = new ModelEditorClass();

export default ModelEditor;
