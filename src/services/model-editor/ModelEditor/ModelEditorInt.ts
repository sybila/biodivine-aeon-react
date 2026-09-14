import type { Result } from '../../../types/result';
import type {
  MenuTabTypeMENotNull,
  ModelStats,
  RegulationVariables,
} from '../../../types/types';

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

  /**
   * Changes the name of a variable.
   *
   * @param id - The ID of the variable to rename.
   * @param newName - The new name for the variable.
   * @param force - Optional flag to force the rename operation even if the new name is empty. Defaults to `false`.
   * @returns A `Result<boolean>` indicating the success or failure of the operation.
   *
   */
  changeVariableName(
    id: number,
    newName: string,
    force?: boolean
  ): Result<boolean>;

  /** Removes a variable */
  removeVariable(id: number): Promise<void>;

  // #endregion

  // #region --- Regulation Actions ---

  toggleRegulationMonocity(regulatorId: number, targetId: number): void;

  toggleRegulationObservability(regulatorId: number, targetId: number): void;

  // #endregion

  // #region --- Update Functions ---

  /**
   * Sets an update function for a variable.
   * @param id - The ID of the variable.
   * @param updateFunction - The string representation of the update function.
   * @returns A `Result<boolean>` object. If successful, the boolean value is `true`. If an error occurs, it contains an error message.
   */
  setUpdateFunction(id: number, updateFunction: string): Result<boolean>;

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

  // #region --- Menu Tab Actions ---

  /** Opens a menu tab by its type.
   *  @param tabType - The type of the menu tab to open.
   *  @returns True if the tab was opened successfully, false otherwise.
   */
  openMenuTab(tabType: MenuTabTypeMENotNull): boolean;

  /** Scrolls a variable into view in the variable table of the Model Editor menu tab.
   *  Opens the Model Editor menu tab if it is not already open.
   *  @param variableId - The id of the variable to scroll into view. */
  scrollVariableIntoView(variableId: number): void;

  // #endregion

  // #region --- Utilities Menu Actions ----

  /** Opens utilities menu of the Model Editor page. */
  openUtilitiesMenu(): void;

  /** Opens utilities menu and put focus on the global search text input. */
  focusOnGlobalSearch(): void;

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
