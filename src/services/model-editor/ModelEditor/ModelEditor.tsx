import ChangeUpFunOverlayContent from '../../../components/react-components/model-editor/ChangeUpFunOverlayContent/ChangeUpFunOverlayContent';
import ChangeVarNameOverlayContent from '../../../components/react-components/model-editor/ChangeVarNameOverlayContent/ChangeVarNameOverlayContent';
import type { OverlayWindowState } from '../../../stores/ContentOverlayWindow/OverlayWindowState';
import type { HelpHoverState } from '../../../stores/HelpHover/HelpHoverState';
import type { RegulationsStatus } from '../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { UpdateFunctionsState } from '../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import type {
  MenuTabButton,
  MenuTabTypeMENotNull,
  ModelStats,
  RegulationVariables,
} from '../../../types';
import type { LiveModelInt } from '../../global/LiveModel/LiveModelInt';
import type { MessageInt } from '../../global/Message/MessageInt';
import type { StringProviderInt } from '../../global/StringProvider/StringProviderInt';
import type { ModelVisualizationInt } from '../ModelVisualization/ModelVisualizationInt';
import type { ModelEditorInt } from './ModelEditorInt';

/**
    Responsible for managing the UI of the model editor, i.e. adding/removing variables and regulations, focusing
    right elements when needed, etc.
*/
class ModelEditor implements ModelEditorInt {
  // #region --- Properties + Constructor ---

  /** Currently searched variable name in the ModelEditorTabContent.tsx component */
  private variableSearch: string = '';

  private modelVisualizationServ: ModelVisualizationInt;
  private liveModelServ: LiveModelInt;
  private stringProviderServ: StringProviderInt;
  private messageServ: MessageInt;

  private overlayWindowStore: ZustandStore<OverlayWindowState>;
  private regulationStore: ZustandStore<RegulationsStatus>;
  private variablesStore: ZustandStore<VariablesStatus>;
  private updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
  private modelEditorStatusStore: ZustandStore<ModelEditorStatus>;
  private helpHoverStore: ZustandStore<HelpHoverState>;

  constructor(
    modelVisualization: ModelVisualizationInt,
    liveModelServ: LiveModelInt,
    stringProviderServ: StringProviderInt,
    messageServ: MessageInt,

    overlayWindowStore: ZustandStore<OverlayWindowState>,
    regulationStore: ZustandStore<RegulationsStatus>,
    variablesStore: ZustandStore<VariablesStatus>,
    updateFunctionsStore: ZustandStore<UpdateFunctionsState>,
    modelEditorStatusStore: ZustandStore<ModelEditorStatus>,
    helpHoverStore: ZustandStore<HelpHoverState>
  ) {
    this.modelVisualizationServ = modelVisualization;
    this.liveModelServ = liveModelServ;
    this.stringProviderServ = stringProviderServ;
    this.messageServ = messageServ;

    this.overlayWindowStore = overlayWindowStore;
    this.regulationStore = regulationStore;
    this.variablesStore = variablesStore;
    this.updateFunctionsStore = updateFunctionsStore;
    this.modelEditorStatusStore = modelEditorStatusStore;
    this.helpHoverStore = helpHoverStore;
  }

  // #endregion

  // #region --- Variable Search ---

  /** Returns currently searched variable name in the ModelEditorTabContent.tsx component */
  public getVariableSearch(): string {
    return this.variableSearch;
  }

  /** Sets currently searched variable name in the ModelEditorTabContent.tsx component */
  public setVariableSearch(name: string) {
    this.variableSearch = name;
  }

  // #endregion

  // #region --- Variable Actions ---

  /** Adds a new variable and zooms on it */
  public addVariable() {
    const newVariableId = this.liveModelServ.Variables.addVariable(true, true);
    if (newVariableId !== undefined) {
      this.zoomOnVariable(newVariableId);
    }
  }

  /** Changes the name of a variable */
  public changeVariableName(id: number, newName: string): boolean {
    if (newName != '') {
      const error = this.liveModelServ.Variables.renameVariable(
        id,
        newName,
        true,
        false
      );

      if (error) {
        this.messageServ.showError('Variable name not changed: ' + error);
        return false;
      }

      return true;
    }
    return false;
  }

  /** Removes a variable */
  public async removeVariable(id: number) {
    await this.liveModelServ.Variables.removeVariable(id, true);
  }

  // #endregion

  // #region --- Regulation Actions ---

  public toggleRegulationMonocity(regulatorId: number, targetId: number): void {
    this.liveModelServ.Regulations.toggleMonotonicity(
      regulatorId,
      targetId,
      true,
      false
    );
  }

  public toggleRegulationObservability(regulatorId: number, targetId: number) {
    this.liveModelServ.Regulations.toggleObservability(
      regulatorId,
      targetId,
      true,
      false
    );
  }

  // #endregion

  // #region --- Update Functions ---

  /** Sets update function for a variable in the ModelEditorTabContent.tsx component */
  public setUpdateFunction(
    id: number,
    updateFunction: string
  ): string | undefined {
    const error = this.liveModelServ.UpdateFunctions.setUpdateFunction(
      id,
      updateFunction,
      true,
      false
    );

    if (error) {
      this.messageServ.showError('Update function not changed: ' + error);
      return error;
    }

    return undefined;
  }

  // #endregion

  // #region --- Model Info ---

  public getModelStats(): ModelStats {
    return this.liveModelServ.Export.stats();
  }

  /** Sets the model name in the LiveModel */
  public setModelDescription(description: string) {
    this.liveModelServ.Info.setModelDescription(description, true, false);
  }

  /** Sets the model name in the LiveModel */
  public setModelName(name: string) {
    this.liveModelServ.Info.setModelName(name, true, false);
  }

  // #endregion

  // #region --- Cytoscape Actions ---

  /** Toggles hover state on a variable node in the ModelVisualization canvas.
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   */
  public hoverVariableCytoscape(id: number, turnOnHover: boolean) {
    this.modelVisualizationServ.hoverNode(id, turnOnHover);
  }

  /** Toggles hover state on a edge node in the ModelVisualization canvas.
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   */
  public hoverRegulationCytoscape(
    regulation: RegulationVariables,
    turnOnHover: boolean
  ) {
    this.modelVisualizationServ.hoverEdge(
      regulation.regulator,
      regulation.target,
      turnOnHover
    );
  }

  /** Finds variable in the ModelVisualization canvas nad zooms on it */
  public zoomOnVariable(id: number) {
    this.modelVisualizationServ.showNode(id);
  }

  // #endregion

  // #region --- Menu Tab Actions ---

  /** Opens a menu tab by its type.
   *  @param tabType - The type of the menu tab to open.
   *  @returns {boolean} - True if the tab was opened successfully, false otherwise.
   */
  public openMenuTab(tabType: MenuTabTypeMENotNull): boolean {
    const button: MenuTabButton | undefined =
      this.modelEditorStatusStore.getState().menuTabButtonsRef[tabType];

    if (button) {
      if (!button.isActive) {
        button.click();
      }
      return true;
    }

    return false;
  }

  /** Scrolls a variable into view in the variable table of the Model Editor menu tab.
   *  Opens the Model Editor menu tab if it is not already open.
   *  @param variableId - The id of the variable to scroll into view.
   *  @returns {void} */
  public async scrollVariableIntoView(variableId: number): Promise<void> {
    if (!this.openMenuTab('Model Editor')) {
      console.warn(
        'Error: Could not open Model Editor menu tab to scroll variable into view. Missing menu tab button reference'
      );
    } else {
      await new Promise((resolve) => setTimeout(resolve, 15));
      this.modelEditorStatusStore.getState().setScrollToVariable(variableId);
    }
  }

  // #endregion

  // #region --- Open Content Overlay Windows ---

  /** Opens the "Change Variable Name" overlay window.
   *  @param varId - The id of the variable to change the name of.
   */
  public openChangeVarNameWindow(varId: number) {
    if (varId === undefined) return;

    this.overlayWindowStore.getState().setCurrentContent({
      header: 'Edit Variable Name',
      content: (
        <ChangeVarNameOverlayContent
          varId={varId}
          modelEditorServ={this}
          variablesStore={this.variablesStore}
        />
      ),
    });
  }

  /** Opens the "Change Update Function" overlay window.
   *  @param varId - The id of the variable to change the update function of.
   */
  public openChangeUpdateFunctionWindow(varId: number) {
    if (varId === undefined) return;

    this.overlayWindowStore.getState().setCurrentContent({
      header: 'Edit Update Function',
      content: (
        <ChangeUpFunOverlayContent
          varId={varId}
          modelEditorServ={this}
          pageStringProviderServ={this.stringProviderServ.ModelEditorPage}
          regulationsStore={this.regulationStore}
          variablesStore={this.variablesStore}
          updateFunctionsStore={this.updateFunctionsStore}
          helpHoverStore={this.helpHoverStore}
        />
      ),
    });
  }

  // #endregion
}

export default ModelEditor;
