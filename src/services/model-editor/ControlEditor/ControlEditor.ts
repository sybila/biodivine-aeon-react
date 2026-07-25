import type { ModelEditorStatus } from '../../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import type { ModelVisualizationInt } from '../ModelVisualization/ModelVisualizationInt';
import type { ControlEditorInt } from './ControlEditorInt';

class ControlEditor implements ControlEditorInt {
  // #region --- Properties + Constructor ---

  /** Currently searched variable name in the ControlEditorTabContent.tsx component */
  private variableSearch: string = '';

  private modelVisualizationServ: ModelVisualizationInt;
  private modelEditorStatusStore: ZustandStore<ModelEditorStatus>;

  constructor(
    modelVisualizationServ: ModelVisualizationInt,
    modelEditorStatusStore: ZustandStore<ModelEditorStatus>
  ) {
    this.modelVisualizationServ = modelVisualizationServ;
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
