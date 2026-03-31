import ChangeUpFunOverlayContent from '../../../components/react-components/model-editor/ChangeUpFunOverlayContent/ChangeUpFunOverlayContent';
import ChangeVarNameOverlayContent from '../../../components/react-components/model-editor/ChangeVarNameOverlayContent/ChangeVarNameOverlayContent';
import type { OverlayWindowState } from '../../../stores/ContentOverlayWindow/OverlayWindowState';
import type { RegulationsStatus } from '../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { UpdateFunctionsState } from '../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import type {
  ModelEditorItem,
  ModelStats,
  RegulationVariables,
} from '../../../types';
import type { LiveModelInt } from '../../global/LiveModel/LiveModelInt';
import type { MessageInt } from '../../global/Message/MessageInt';
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
  private messageServ: MessageInt;

  private overlayWindowStore: ZustandStore<OverlayWindowState>;
  private regulationStore: ZustandStore<RegulationsStatus>;
  private variablesStore: ZustandStore<VariablesStatus>;
  private updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
  private modelEditorStatusStore: ZustandStore<ModelEditorStatus>;

  constructor(
    modelVisualization: ModelVisualizationInt,
    liveModelServ: LiveModelInt,
    messageServ: MessageInt,

    overlayWindowStore: ZustandStore<OverlayWindowState>,
    regulationStore: ZustandStore<RegulationsStatus>,
    variablesStore: ZustandStore<VariablesStatus>,
    updateFunctionsStore: ZustandStore<UpdateFunctionsState>,
    modelEditorStatusStore: ZustandStore<ModelEditorStatus>
  ) {
    this.modelVisualizationServ = modelVisualization;
    this.liveModelServ = liveModelServ;
    this.messageServ = messageServ;

    this.overlayWindowStore = overlayWindowStore;
    this.regulationStore = regulationStore;
    this.variablesStore = variablesStore;
    this.updateFunctionsStore = updateFunctionsStore;
    this.modelEditorStatusStore = modelEditorStatusStore;
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

  /** Toggles hover state on a variable in the ModelEditorTabContent.tsx component
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   */
  public hoverVariable(id: number, turnOnHover: boolean) {
    const hoverInfo = this.modelEditorStatusStore.getState().hoverItemInfo;

    if (hoverInfo?.type === 'variable') {
      if (!turnOnHover) {
        this.modelEditorStatusStore.getState().setHoverItemInfo(null);
        return;
      }

      if (hoverInfo.id === id) {
        return;
      }
    }

    if (turnOnHover) {
      this.modelEditorStatusStore
        .getState()
        .setHoverItemInfo({ type: 'variable', id });
    }
  }

  // #endregion

  // #region --- Regulation Selection/Hover ---

  /** Returns last selected regulation id in the ModelEditorCanvas.tsx component. Returns null if no regulation is selected */
  public getSelectedRegulation(): RegulationVariables | null {
    const selectedItemInfo: ModelEditorItem | null =
      this.modelEditorStatusStore.getState().selectedItemInfo;

    return selectedItemInfo?.type === 'regulation'
      ? selectedItemInfo.regulationIds
      : null;
  }

  /** Sets currently selected regulation id in the ModelEditorCanvas.tsx component. id is null if no regulation is selected */
  public setSelectedRegulation(regulation: RegulationVariables | null) {
    this.modelEditorStatusStore
      .getState()
      .setSelectedItemInfo(
        regulation ? { type: 'regulation', regulationIds: regulation } : null
      );
  }

  /** Toggles hover state on a regulation in the ModelEditorTabContent.tsx component
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   */
  public hoverRegulation(
    regulation: RegulationVariables,
    turnOnHover: boolean
  ) {
    const hoverInfo = this.modelEditorStatusStore.getState().hoverItemInfo;

    if (hoverInfo?.type === 'regulation') {
      if (!turnOnHover) {
        this.modelEditorStatusStore.getState().setHoverItemInfo(null);
        return;
      }
    }

    if (turnOnHover) {
      this.modelEditorStatusStore
        .getState()
        .setHoverItemInfo({ type: 'regulation', regulationIds: regulation });
    }
  }

  /** Toggles selected state on a regulation in the ModelEditorTabContent.tsx component
   * If `select` is true, it sets regulation as selected; if false, it unselects it.
   */
  public selectRegulation(regulation: RegulationVariables, select: boolean) {
    const hoverInfo = this.modelEditorStatusStore.getState().hoverItemInfo;

    if (hoverInfo?.type === 'regulation') {
      if (!select) {
        this.modelEditorStatusStore.getState().setHoverItemInfo(null);
        return;
      }
    }

    if (select) {
      this.modelEditorStatusStore
        .getState()
        .setHoverItemInfo({ type: 'regulation', regulationIds: regulation });
    }
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
          regulationsStore={this.regulationStore}
          variablesStore={this.variablesStore}
          updateFunctionsStore={this.updateFunctionsStore}
        />
      ),
    });
  }
}

export default ModelEditor;
