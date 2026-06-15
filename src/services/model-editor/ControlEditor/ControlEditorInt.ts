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

  // #region --- Control Enabled Actions ---

  /** Changes the control enabled state of a variable by its ID */
  changeControlEnabled(id: number, enabled: boolean): void;

  /** Toggles the control enabled state of a variable by its ID */
  toggleControlEnabled(id: number): void;

  /** Changes the control enabled state of selected variables.
   *  @param selectedVariables - Set of variable IDs:
   *  @param controlEnabled - The new control enabled state to set (true or false)
   *  Only variables that are marked as selected (true) will have their control enabled state changed.
   *  Variables not present in the selectedVariables array are considered not selected and will be ignored.
   *  If a variable name does not correspond to any existing variable, it will be ignored.
   */
  changeControlEnabledSelected(
    selectedVariables: Set<number>,
    controlEnabled: boolean
  ): void;

  // #endregion

  // #region --- Phenotype Actions ---

  /** Changes the phenotype state of a variable by its ID */
  changePhenotype(id: number, phenotype: Phenotype): void;

  /** Toggles the phenotype state of a variable by its ID */
  togglePhenotype(id: number): void;

  /** Changes the phenotype state of selected variables.
   *  @param selectedVariables - Set of variable IDs:
   *  @param phenotype - The new phenotype state to set (true, false, or null)
   *  Only variables that are marked as selected (true) will have their phenotype state changed.
   *  Variables not present in the selectedVariables array are considered not selected and will be ignored.
   *  If a variable name does not correspond to any existing variable, it will be ignored.
   */
  changePhenotypeSelected(
    selectedVariables: Set<number>,
    phenotype: Phenotype
  ): void;

  // #endregion

  // #region --- Phenotype Oscillation Getter/Setter ---

  /** Returns the currently set phenotype oscillation state in the ControlEditorTabContent.tsx component */
  getPhenotypeOscillation(): Oscillation;

  /** Sets the currently set phenotype oscillation state in the ControlEditorTabContent.tsx component */
  setPhenotypeOscillation(newOscillation: Oscillation): void;

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
