import { Message } from '../../../components/lit-components/message-wrapper';
import ChangeVarNameOverlayContent from '../../../components/react-components/model-editor/ChangeVarNameOverlayContent/ChangeVarNameOverlayContent';
import useOverlayWindowStore from '../../../stores/ContentOverlayWindow/useOverlayWindowStore';
import type { ModelStats, RegulationVariables } from '../../../types';
import { LiveModel } from '../../global/LiveModel/LiveModel';
import CytoscapeME from '../CytoscapeME/CytoscapeME';

/**
    Responsible for managing the UI of the model editor, i.e. adding/removing variables and regulations, focusing
    right elements when needed, etc.
*/
class ModelEditorClass {
  // #region --- Properties ---

  /** Function for toggling hover state of variables in the ModelEditorTabContent.tsx component */
  private hoverVariableInfo:
    | ((id: number, turnOnHover: boolean) => void)
    | null = null;

  /** Currently searched variable name in the ModelEditorTabContent.tsx component */
  private variableSearch: string = '';

  /** Function for toggling hover state of regulations in the ModelEditorTabContent.tsx component */
  private hoverRegulationInfo:
    | ((regulation: RegulationVariables, turnOnHover: boolean) => void)
    | null = null;

  /** Function for toggling selected state of regulations in the ModelEditorTabContent.tsx component */
  private selectRegulationInfo:
    | ((regulation: RegulationVariables, select: boolean) => void)
    | null = null;

  /** Currently selected regulation in the ModelEditorCanvas.tsx component */
  private selectedRegulation: RegulationVariables | null = null;

  // #endregion

  // #region --- Hover/Select Variable Function Setters ---

  /** Sets hover function for variables inside the ModelEditorTabContent.tsx (needs to be called before hoverVariable function) */
  public setHoverVariableFunction(
    hoverFunction: (id: number, turnOnHover: boolean) => void
  ) {
    this.hoverVariableInfo = hoverFunction;
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
   * (you must first set hoverVariableInfo with setHoverVariableFunction before running this function)
   */
  public hoverVariable(id: number, turnOnHover: boolean) {
    if (this.hoverVariableInfo) {
      this.hoverVariableInfo(id, turnOnHover);
    }
  }

  // #endregion

  // #region --- Hover/Select Regulation Function Setters ---

  /** Sets hover function for regulations inside the ModelEditorTabContent.tsx (needs to be called before hoverRegulation function) */
  public setHoverRegulationFunction(
    hoverFunction: (
      regulation: RegulationVariables,
      turnOnHover: boolean
    ) => void
  ) {
    this.hoverRegulationInfo = hoverFunction;
  }

  /** Sets select function for regulations inside the ModelEditorTabContent.tsx (needs to be called before selectRegulation function) */
  public setSelectRegulationFunction(
    selectFunction: (regulation: RegulationVariables, select: boolean) => void
  ) {
    this.selectRegulationInfo = selectFunction;
  }

  // #endregion

  // #region --- Regulation Selection/Hover ---

  /** Returns last selected regulation id in the ModelEditorCanvas.tsx component. Returns null if no regulation is selected */
  public getSelectedRegulation(): RegulationVariables | null {
    return this.selectedRegulation;
  }

  /** Sets currently selected regulation id in the ModelEditorCanvas.tsx component. id is null if no regulation is selected */
  public setSelectedRegulation(regulation: RegulationVariables | null) {
    this.selectedRegulation = regulation;
  }

  /** Toggles hover state on a regulation in the ModelEditorTabContent.tsx component
   * If `turnOnHover` is true, it starts the hover effect; if false, it ends it.
   * (you must first set hoverRegulationInfo with setHoverRegulationFunction before running this function)
   */
  public hoverRegulation(
    regulation: RegulationVariables,
    turnOnHover: boolean
  ) {
    if (this.hoverRegulationInfo) {
      this.hoverRegulationInfo(regulation, turnOnHover);
    }
  }

  /** Toggles selected state on a regulation in the ModelEditorTabContent.tsx component
   * If `select` is true, it sets regulation as selected; if false, it unselects it.
   * (you must first set selectRegulationInfo with setSelectRegulationFunction before running this function)
   */
  public selectRegulation(regulation: RegulationVariables, select: boolean) {
    if (this.selectRegulationInfo) {
      this.setSelectedRegulation(select ? regulation : null);
      this.selectRegulationInfo(regulation, select);
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
    return LiveModel.UpdateFunctions.setUpdateFunction(id, updateFunction);
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

  /** Opens the "Change Variable Name" overlay window */
  public openChangeVarNameWindow(varId: number) {
    if (varId === undefined) return;

    useOverlayWindowStore.getState().setCurrentContent({
      header: 'Edit Variable Name',
      content: <ChangeVarNameOverlayContent varId={varId} />,
    });
  }
}

const ModelEditor: ModelEditorClass = new ModelEditorClass();

export default ModelEditor;
