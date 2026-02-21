import type { ModelStats, RegulationVariables } from '../../../types';

/**
 * Interface for ModelEditor service that is used to manage the state of the ModelEditor page.
 **/
export interface ModelEditorInt {
  // #region --- Variable Search ---

  /** Returns currently searched variable name in the ModelEditorTabContent.tsx component */
  getVariableSearch(): string;

  /** Sets currently searched variable name in the ModelEditorTabContent.tsx component */
  setVariableSearch(name: string): void;

  // #endregion

  // #region --- Variable Actions ---

  /** Adds a new variable and zooms on it */
  addVariable(): void;

  /** Changes the name of a variable */
  changeVariableName(id: number, newName: string): boolean;

  /** Removes a variable */
  removeVariable(id: number): Promise<void>;

  /** Toggles hover state on a variable in the ModelEditorTabContent.tsx component
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   */
  hoverVariable(id: number, turnOnHover: boolean): void;

  // #endregion

  // #region --- Regulation Selection/Hover ---

  /** Returns last selected regulation id in the ModelEditorCanvas.tsx component. Returns null if no regulation is selected */
  getSelectedRegulation(): RegulationVariables | null;

  /** Sets currently selected regulation id in the ModelEditorCanvas.tsx component. id is null if no regulation is selected */
  setSelectedRegulation(regulation: RegulationVariables | null): void;

  /** Toggles hover state on a regulation in the ModelEditorTabContent.tsx component
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   */
  hoverRegulation(regulation: RegulationVariables, turnOnHover: boolean): void;

  /** Toggles selected state on a regulation in the ModelEditorTabContent.tsx component
   * If `select` is true, it sets regulation as selected; if false, it unselects it.
   */
  selectRegulation(regulation: RegulationVariables, select: boolean): void;

  // #endregion

  // #region --- Regulation Actions ---

  toggleRegulationMonocity(regulatorId: number, targetId: number): void;

  toggleRegulationObservability(regulatorId: number, targetId: number): void;

  // #endregion

  // #region --- Update Functions ---

  /** Sets update function for a variable in the ModelEditorTabContent.tsx component */
  setUpdateFunction(id: number, updateFunction: string): string | undefined;

  // #endregion

  // #region --- Model Info ---

  getModelStats(): ModelStats;

  /** Sets the model name in the LiveModel */
  setModelDescription(description: string): void;

  /** Sets the model name in the LiveModel */
  setModelName(name: string): void;

  // #endregion

  // #region --- Cytoscape Actions ---

  /** Toggles hover state on a variable node in the CytoscapeMe canvas.
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   */
  hoverVariableCytoscape(id: number, turnOnHover: boolean): void;

  /** Toggles hover state on a edge node in the CytoscapeMe canvas.
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   */
  hoverRegulationCytoscape(
    regulation: RegulationVariables,
    turnOnHover: boolean
  ): void;

  /** Finds variable in the CytoscapeMe canvas nad zooms on it */
  zoomOnVariable(id: number): void;

  // #endregion

  // #region --- Open Content Overlay Windows ---

  /** Opens the "Change Variable Name" overlay window.
   *  @param varId - The id of the variable to change the name of.
   */
  openChangeVarNameWindow(varId: number): void;

  /** Opens the "Change Update Function" overlay window.
   *  @param varId - The id of the variable to change the update function of.
   */
  openChangeUpdateFunctionWindow(varId: number): void;

  // #endregion
}
