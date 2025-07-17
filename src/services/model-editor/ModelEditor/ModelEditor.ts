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

  /** Sets reload function for the ModelEditorTabContent.tsx (needs to be called before reloadModelEditorTab function) */
  public setReloadFunction(reloadFunction: () => void) {
    this.reloadEditorTab = reloadFunction;
  }

  /** Function which enforces reload of the ModelEditorTabContent.tsx component
   * (you must first set reloadEditorTab with setReloadFunction brfore running this function) */
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

  /** Toggles hover state on a variable node in the ModelEditorTabContent.tsx component
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   * Before running
   */
  public hoverVariable(id: number, turnOnHover: boolean) {
    if (this.hoverVariableInfo) {
      this.hoverVariableInfo(id, turnOnHover);
    }
  }

  /** Toggles hover state on a variable node in the CytoscapeMe canvas.
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   * (you must first set reloadEditorTab with setReloadFunction brfore running this function)
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

  public getModelStats(): ModelStats {
    return LiveModel.Export.stats();
  }

  public getAllVariables(): Variable[] {
    return LiveModel.Variables.getAllVariables();
  }
}

const ModelEditor: ModelEditorClass = new ModelEditorClass();

export default ModelEditor;
