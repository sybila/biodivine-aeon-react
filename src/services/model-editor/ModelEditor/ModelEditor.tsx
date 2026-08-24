import ChangeUpFunOverlayContent from '../../../components/react-components/model-editor/ChangeUpFunOverlayContent/ChangeUpFunOverlayContent';
import ChangeVarNameOverlayContent from '../../../components/react-components/model-editor/ChangeVarNameOverlayContent/ChangeVarNameOverlayContent';
import type { OverlayWindowState } from '../../../stores/ContentOverlayWindow/OverlayWindowState';
import type { HelpHoverState } from '../../../stores/HelpHover/HelpHoverState';
import type { RegulationsStatus } from '../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { UpdateFunctionsState } from '../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import { err, ok } from '../../../types/result';
import type {
  ContentVisibleComponent,
  MenuTabButton,
  MenuTabTypeMENotNull,
  RegulationVariables,
  UpdateFunctionStatus,
} from '../../../types/types';
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

  public getVariableSearch() {
    return this.variableSearch;
  }

  public setVariableSearch(name: string) {
    this.variableSearch = name;
  }

  // #endregion

  // #region --- Variable Actions ---

  public addVariable() {
    const newVariableId = this.liveModelServ.Variables.addVariable(true, true);
    if (newVariableId !== undefined) {
      this.zoomOnVariable(newVariableId);
    }
  }

  public changeVariableName(
    id: number,
    newName: string,
    force: boolean = false
  ) {
    if (force || newName != '') {
      const error = this.liveModelServ.Variables.renameVariable(
        id,
        newName,
        true,
        force
      );

      if (!force && error) {
        return err(error);
      }

      return ok(true);
    }
    return ok(false);
  }

  public async removeVariable(id: number) {
    await this.liveModelServ.Variables.removeVariable(id, true);
  }

  // #endregion

  // #region --- Regulation Actions ---

  public toggleRegulationMonocity(regulatorId: number, targetId: number) {
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

  public setUpdateFunction(id: number, updateFunction: string) {
    const error = this.liveModelServ.UpdateFunctions.setUpdateFunction(
      id,
      updateFunction,
      true,
      false
    );

    return error ? err(error) : ok(true);
  }

  // #endregion

  // #region --- Model Info ---

  public getModelStats() {
    return this.liveModelServ.Export.stats();
  }

  public setModelDescription(description: string) {
    this.liveModelServ.Info.setModelDescription(description, true, false);
  }

  public setModelName(name: string) {
    this.liveModelServ.Info.setModelName(name, true, false);
  }

  // #endregion

  // #region --- Cytoscape Actions ---

  public hoverVariableCytoscape(id: number, turnOnHover: boolean) {
    this.modelVisualizationServ.hoverNode(id, turnOnHover);
  }

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

  public zoomOnVariable(id: number) {
    this.modelVisualizationServ.showNode(id);
  }

  // #endregion

  // #region --- Menu Tab Actions ---

  public openMenuTab(tabType: MenuTabTypeMENotNull) {
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

  public async scrollVariableIntoView(variableId: number) {
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

  // #region --- Utilities Menu Actions ----

  public openUtilitiesMenu() {
    const reference: ContentVisibleComponent | null =
      this.modelEditorStatusStore.getState().utilitiesMenuRef;

    if (reference === null) {
      console.warn(
        'Error: Could not open the Model Editor Utilities Menu. Missing reference.'
      );

      return;
    }

    reference.contentVisible = true;
  }

  public focusOnGlobalSearch() {
    const searchReference =
      this.modelEditorStatusStore.getState().globalSearchRef;

    if (!searchReference) {
      console.warn(
        'Error: Could not focus on the global search text input. Missing reference.'
      );

      return;
    }

    this.openUtilitiesMenu();

    searchReference.focus();
  }

  // #endregion

  // #region --- Open Content Overlay Windows ---

  public openChangeVarNameWindow(varId: number) {
    if (varId === undefined) return;

    const originalName: string =
      this.variablesStore.getState().variables[varId]?.name ?? '';

    this.overlayWindowStore.getState().setCurrentContent({
      header: 'Edit Variable Name',
      content: (
        <ChangeVarNameOverlayContent
          varId={varId}
          originalName={originalName}
          closeFunction={() =>
            this.overlayWindowStore.getState().setCurrentContent(null)
          }
          modelEditorServ={this}
          pageStringProviderServ={this.stringProviderServ.ModelEditorPage}
          messageServ={this.messageServ}
          helpHoverStore={this.helpHoverStore}
        />
      ),
      showCloseButton: false,
      closeOnBgClick: false,
    });
  }

  public openChangeUpdateFunctionWindow(varId: number) {
    if (varId === undefined) return;

    const varName =
      this.variablesStore.getState().getVariableName(varId) ?? 'Unknown';

    const originalUpdateFunction =
      this.updateFunctionsStore.getState().getUpdateFunctionId(varId)
        ?.functionString ?? '';

    const originalUpdateFunctionStatus = this.updateFunctionsStore.getState()
      .updateFunctionStatus[varId] ?? {
      status: 'Missing Update Function Status: Validate the update function.',
      isError: true,
    };

    this.overlayWindowStore.getState().setCurrentContent({
      header: 'Edit Update Function',
      content: (
        <ChangeUpFunOverlayContent
          varId={varId}
          varName={varName}
          originalUpdateFunction={originalUpdateFunction}
          originalUpdateFunctionStatus={originalUpdateFunctionStatus}
          validateUpdateFunctionFun={(
            setStatus: (status: UpdateFunctionStatus) => void,
            updateFunction: string
          ) =>
            this.liveModelServ.UpdateFunctions.validateUpdateFunction(
              varId,
              (status: UpdateFunctionStatus) => setStatus(status),
              updateFunction
            )
          }
          closeFunction={() =>
            this.overlayWindowStore.getState().setCurrentContent(null)
          }
          modelEditorServ={this}
          pageStringProviderServ={this.stringProviderServ.ModelEditorPage}
          messageServ={this.messageServ}
          regulationsStore={this.regulationStore}
          variablesStore={this.variablesStore}
          updateFunctionsStore={this.updateFunctionsStore}
          helpHoverStore={this.helpHoverStore}
        />
      ),
      showCloseButton: false,
      closeOnBgClick: false,
    });
  }

  // #endregion
}

export default ModelEditor;
