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

  public hoverVariable(id: number, turnOnHover: boolean) {
    this.modelEditorStatusStore
      .getState()
      .setHoverItemInfo(turnOnHover ? { type: 'variable', id } : null);
  }

  // #endregion

  // #region --- Variable Search ---

  public getVariableSearch() {
    return this.variableSearch;
  }

  public setVariableSearch(name: string) {
    this.variableSearch = name;
  }

  // #endregion

  // #region --- Cytoscape Actions ---

  public hoverVariableVisualization(id: number, turnOnHover: boolean) {
    this.modelVisualizationServ.hoverNode(id, turnOnHover);
  }

  public selectVariableVisualization(id: number, turnOnSelect: boolean) {
    if (turnOnSelect) {
      this.modelVisualizationServ.selectNode(id);
    } else {
      this.modelVisualizationServ.unselectNode(id);
    }
  }

  public unselectAllVisualization() {
    this.modelVisualizationServ.unselectAll();
  }

  // #endregion
}

export default ControlEditor;
