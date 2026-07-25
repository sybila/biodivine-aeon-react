import type { Oscillation, Phenotype } from '../../../types';

/**
 * Interface for ControlEditor functionality of the ModelEditor page.
 */
export interface ControlEditorInt {
  // #region --- Hover/Select Variable Functions ---

  /** Toggles hover state on a variable in the ControlEditorTabContent.tsx component
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   * (you must first set hoverVariableInfo with setHoverVariableFunction before running this function)
   */
  hoverVariable(id: number, turnOnHover: boolean): void;

  // #endregion

  // #region --- Variable Search ---

  /** Returns last searched variable name in the ControlEditorTabContent.tsx component */
  getVariableSearch(): string;

  /** Sets currently searched variable name in the ControlEditorTabContent.tsx component */
  setVariableSearch(name: string): void;

  // #endregion

  // #region --- Cytoscape Actions ---

  /** Toggles hover state on a variable node in the CytoscapeMe canvas.
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   */
  hoverVariableVisualization(id: number, turnOnHover: boolean): void;

  /** Toggles selection state on a variable node in the modelVisualizationServ canvas.
   *  If `turnOnSelect` is true, it selects the node; if false, it unselects it.
   */
  selectVariableVisualization(id: number, turnOnSelect: boolean): void;

  /** Unselects all items selected in the model visualization canvas. */
  unselectAllVisualization(): void;

  // #endregion
}
