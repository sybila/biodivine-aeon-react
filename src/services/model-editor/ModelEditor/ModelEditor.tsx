import { Message } from '../../../components/lit-components/message-wrapper';
import ChangeUpFunOverlayContent from '../../../components/react-components/model-editor/ChangeUpFunOverlayContent/ChangeUpFunOverlayContent';
import ChangeVarNameOverlayContent from '../../../components/react-components/model-editor/ChangeVarNameOverlayContent/ChangeVarNameOverlayContent';
import useOverlayWindowStore from '../../../stores/ContentOverlayWindow/useOverlayWindowStore';
import useRegulationsStore from '../../../stores/LiveModel/RegulationsStore/useRegulationsStore';
import useUpdateFunctionsStore from '../../../stores/LiveModel/UpdateFunctionsStore/useUpdateFunctionsStore';
import useVariablesStore from '../../../stores/LiveModel/VariablesStore/useVariablesStore';
import useModelEditorStatus from '../../../stores/ModelEditor/useModelEditorStatus';
import type {
  ModelEditorItem,
  ModelStats,
  RegulationVariables,
} from '../../../types';
import { LiveModel } from '../../global/LiveModel/LiveModel';
import CytoscapeME from '../ModelVisualization/CytoscapeME';
import type { ModelEditorInt } from './ModelEditorInt';

/**
    Responsible for managing the UI of the model editor, i.e. adding/removing variables and regulations, focusing
    right elements when needed, etc.
*/
class ModelEditorClass implements ModelEditorInt {
  // #region --- Properties ---

  /** Currently searched variable name in the ModelEditorTabContent.tsx component */
  private variableSearch: string = '';

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
    const newVariableId = LiveModel.Variables.addVariable(true);
    if (newVariableId !== undefined) {
      this.zoomOnVariable(newVariableId);
    }
  }

  /** Changes the name of a variable */
  public changeVariableName(id: number, newName: string): boolean {
    if (newName != '') {
      const error = LiveModel.Variables.renameVariable(id, newName);

      if (error) {
        Message.showError('Variable name not changed: ' + error);
        return false;
      }

      return true;
    }
    return false;
  }

  /** Removes a variable */
  public async removeVariable(id: number) {
    await LiveModel.Variables.removeVariable(id);
  }

  /** Toggles hover state on a variable in the ModelEditorTabContent.tsx component
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   */
  public hoverVariable(id: number, turnOnHover: boolean) {
    const hoverInfo = useModelEditorStatus.getState().hoverItemInfo;

    if (hoverInfo?.type === 'variable') {
      if (!turnOnHover) {
        useModelEditorStatus.getState().setHoverItemInfo(null);
        return;
      }

      if (hoverInfo.id === id) {
        return;
      }
    }

    if (turnOnHover) {
      useModelEditorStatus
        .getState()
        .setHoverItemInfo({ type: 'variable', id });
    }
  }

  // #endregion

  // #region --- Regulation Selection/Hover ---

  /** Returns last selected regulation id in the ModelEditorCanvas.tsx component. Returns null if no regulation is selected */
  public getSelectedRegulation(): RegulationVariables | null {
    const selectedItemInfo: ModelEditorItem | null =
      useModelEditorStatus.getState().selectedItemInfo;

    return selectedItemInfo?.type === 'regulation'
      ? selectedItemInfo.regulationIds
      : null;
  }

  /** Sets currently selected regulation id in the ModelEditorCanvas.tsx component. id is null if no regulation is selected */
  public setSelectedRegulation(regulation: RegulationVariables | null) {
    useModelEditorStatus
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
    const hoverInfo = useModelEditorStatus.getState().hoverItemInfo;

    if (hoverInfo?.type === 'regulation') {
      if (!turnOnHover) {
        useModelEditorStatus.getState().setHoverItemInfo(null);
        return;
      }
    }

    if (turnOnHover) {
      useModelEditorStatus
        .getState()
        .setHoverItemInfo({ type: 'regulation', regulationIds: regulation });
    }
  }

  /** Toggles selected state on a regulation in the ModelEditorTabContent.tsx component
   * If `select` is true, it sets regulation as selected; if false, it unselects it.
   */
  public selectRegulation(regulation: RegulationVariables, select: boolean) {
    const hoverInfo = useModelEditorStatus.getState().hoverItemInfo;

    if (hoverInfo?.type === 'regulation') {
      if (!select) {
        useModelEditorStatus.getState().setHoverItemInfo(null);
        return;
      }
    }

    if (select) {
      useModelEditorStatus
        .getState()
        .setHoverItemInfo({ type: 'regulation', regulationIds: regulation });
    }
  }

  // #endregion

  // #region --- Regulation Actions ---

  public toggleRegulationMonocity(regulatorId: number, targetId: number): void {
    LiveModel.Regulations.toggleMonotonicity(regulatorId, targetId);
  }

  public toggleRegulationObservability(regulatorId: number, targetId: number) {
    LiveModel.Regulations.toggleObservability(regulatorId, targetId);
  }

  // #endregion

  // #region --- Update Functions ---

  /** Sets update function for a variable in the ModelEditorTabContent.tsx component */
  public setUpdateFunction(
    id: number,
    updateFunction: string
  ): string | undefined {
    const error = LiveModel.UpdateFunctions.setUpdateFunction(
      id,
      updateFunction
    );

    if (error) {
      Message.showError('Update function not changed: ' + error);
      return error;
    }

    return undefined;
  }

  // #endregion

  // #region --- Model Info ---

  public getModelStats(): ModelStats {
    return LiveModel.Export.stats();
  }

  /** Sets the model name in the LiveModel */
  public setModelDescription(description: string) {
    LiveModel.Info.setModelDescription(description);
  }

  /** Sets the model name in the LiveModel */
  public setModelName(name: string) {
    LiveModel.Info.setModelName(name);
  }

  // #endregion

  // #region --- Cytoscape Actions ---

  /** Toggles hover state on a variable node in the CytoscapeMe canvas.
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   */
  public hoverVariableCytoscape(id: number, turnOnHover: boolean) {
    CytoscapeME.hoverNode(id, turnOnHover);
  }

  /** Toggles hover state on a edge node in the CytoscapeMe canvas.
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   */
  public hoverRegulationCytoscape(
    regulation: RegulationVariables,
    turnOnHover: boolean
  ) {
    CytoscapeME.hoverEdge(regulation.regulator, regulation.target, turnOnHover);
  }

  /** Finds variable in the CytoscapeMe canvas nad zooms on it */
  public zoomOnVariable(id: number) {
    CytoscapeME.showNode(id);
  }

  // #endregion

  // #region --- Open Content Overlay Windows ---

  /** Opens the "Change Variable Name" overlay window.
   *  @param varId - The id of the variable to change the name of.
   */
  public openChangeVarNameWindow(varId: number) {
    if (varId === undefined) return;

    useOverlayWindowStore.getState().setCurrentContent({
      header: 'Edit Variable Name',
      content: (
        <ChangeVarNameOverlayContent
          varId={varId}
          modelEditorServ={this}
          variablesStore={useVariablesStore}
        />
      ),
    });
  }

  /** Opens the "Change Update Function" overlay window.
   *  @param varId - The id of the variable to change the update function of.
   */
  public openChangeUpdateFunctionWindow(varId: number) {
    if (varId === undefined) return;

    useOverlayWindowStore.getState().setCurrentContent({
      header: 'Edit Update Function',
      content: (
        <ChangeUpFunOverlayContent
          varId={varId}
          modelEditorServ={this}
          regulationsStore={useRegulationsStore}
          variablesStore={useVariablesStore}
          updateFunctionsStore={useUpdateFunctionsStore}
        />
      ),
    });
  }
}

const ModelEditor: ModelEditorClass = new ModelEditorClass();

export default ModelEditor;
