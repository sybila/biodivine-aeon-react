import type { ResultsStatus } from '../../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { ControlStatus } from '../../../stores/LiveModel/ControlStore/ControlStatus';
import type { ModelState } from '../../../stores/LiveModel/LoadedModelStore/ModelState';
import type { ModelInfoState } from '../../../stores/LiveModel/ModelInfoStore/ModelInfoState';
import type { RegulationsStatus } from '../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { UpdateFunctionsState } from '../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablePositionsState } from '../../../stores/LiveModel/VariablePositions/VariablePostionsState';
import type { VariablesStatus } from '../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../../stores/ModelEditor/ModelEditorStatus';
import type { TabsState } from '../../../stores/Navigation/TabState';
import type { UndoRedoState } from '../../../stores/UndoRedo/UndoRedoState';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import type { ComputationModes } from '../../../types';
import type { FileHelpersInt } from '../../utilities/FileHelpers/FileHelpersInt';
import type { ComputationManagerInt } from '../ComputationManager/ComputationManagerInt';
import type { LoadingInt } from '../Loading/LoadingInt';
import type { MessageInt } from '../Message/MessageInt';
import type { TabOperationsInt } from '../Navigation/TabOperationsInt';
import type { WarningInt } from '../Warning/WarningInt';
import ControlLM from './ControlLM/ControlLM';
import type { ControlLMInt } from './ControlLM/ControlLMInt';
import ExportLM from './ExportLM/ExportLM';
import type { ExportLMInt } from './ExportLM/ExportLMInt';
import ImportLM from './ImportLM/ImportLM';
import type { ImportLMInt } from './ImportLM/ImportLMInt';
import InfoLM from './InfoLM/InfoLM';
import type { InfoLMInt } from './InfoLM/InfoLMInt';
import type { LiveModelInt } from './LiveModelInt';
import ModelsLM from './ModelsLM/ModelsLM';
import type { ModelsLMInt } from './ModelsLM/ModelsLMInt';
import RegulationsLM from './RegulationsLM/RegulationsLM';
import type { RegulationsLMInt } from './RegulationsLM/RegulationsLMInt';
import UpdateFunctionsLM from './UpdateFunctionsLM/UpdateFunctionsLM';
import type { UpdateFunctionsLMInt } from './UpdateFunctionsLM/UpdateFunctionsLMInt';
import VariablesLM from './VariablesLM/VariablesLM';
import type { VariablesLMInt } from './VariablesLM/VariablesLMInt';

/**
	Stores the PBN currently loaded into the editor. This is what you should interact with when
	you want to modify the model, not the editor or graph directly.

	It is the responsibility of the `LiveModel`` to always update `ModelEditor` and `ModelVisualization`
	to reflect the current state of the model.
*/
class LiveModel implements LiveModelInt {
  // #region --- Properties + Constructor ---

  /** We use this to indicate that there is a batch of changes to the model that are being processed,
	and we therefore shouldn't run intensive tasks (like function consistency checks on server).
	It is the responsibility of the user of this flag to re-run these tasks AFTER the changes are done.
	Currently we use this only in import. */
  public disable_dynamic_validation: boolean = false;

  private computationManagerServ: ComputationManagerInt;
  private tabOperationsServ: TabOperationsInt;
  private warningServ: WarningInt;
  private messageServ: MessageInt;

  private loadedModelStore: ZustandStore<ModelState>;
  private tabStore: ZustandStore<TabsState>;
  private resultsStatusStore: ZustandStore<ResultsStatus>;
  private modelEditorStatusStore: ZustandStore<ModelEditorStatus>;

  constructor(
    computationManagerServ: ComputationManagerInt,
    warningServ: WarningInt,
    fileHelpersServ: FileHelpersInt,
    tabOperationsServ: TabOperationsInt,
    messageServ: MessageInt,
    loadingServ: LoadingInt,

    loadedModelStore: ZustandStore<ModelState>,
    tabStore: ZustandStore<TabsState>,
    resultsStatusStore: ZustandStore<ResultsStatus>,
    modelEditorStatusStore: ZustandStore<ModelEditorStatus>,
    variablesStore: ZustandStore<VariablesStatus>,
    regulationsStore: ZustandStore<RegulationsStatus>,
    updateFunctionsStore: ZustandStore<UpdateFunctionsState>,
    controlStore: ZustandStore<ControlStatus>,
    modelInfoStore: ZustandStore<ModelInfoState>,
    modelUndoRedoStore: ZustandStore<UndoRedoState>,
    variablePositionsStore: ZustandStore<VariablePositionsState>
  ) {
    this.computationManagerServ = computationManagerServ;
    this.tabOperationsServ = tabOperationsServ;
    this.warningServ = warningServ;
    this.messageServ = messageServ;

    this.loadedModelStore = loadedModelStore;
    this.tabStore = tabStore;
    this.resultsStatusStore = resultsStatusStore;
    this.modelEditorStatusStore = modelEditorStatusStore;

    this.intializeSubmodules(
      fileHelpersServ,
      loadingServ,

      variablesStore,
      regulationsStore,
      updateFunctionsStore,
      controlStore,
      modelInfoStore,
      modelUndoRedoStore,
      variablePositionsStore
    );

    this.tabStore.getState().firstTabOnClick = () => {
      this.Models.loadModel(0);
    };

    this.computationManagerServ.setLiveModel(this);
  }

  // #endregion

  // #region --- Submodules ---

  /** Functions and properties for managing multiple models. */
  Models!: ModelsLMInt;

  /** Functions and properties for managing model information such as name and description. */
  Info!: InfoLMInt;

  /** Functions and properties used for operations with variables of the model. (adding, removing, renaming, getting all,...)*/
  Variables!: VariablesLMInt;

  /** Functions and properties used for operations with variables update functions. (setting, validating, updating,...) */
  UpdateFunctions!: UpdateFunctionsLMInt;

  /** Functions and properties used for operations with regulations. (adding, removing, setting observability,...) */
  Regulations!: RegulationsLMInt;

  /** Functions connected with setting control parameters of the models variables. */
  Control!: ControlLMInt;

  /** Functions used when importing model from Aeon format. */
  Import!: ImportLMInt;

  /** Functions used for export of the model. */
  Export!: ExportLMInt;

  /** Function which initializes all submodules of the LiveModel. */
  private intializeSubmodules(
    fileHelpersServ: FileHelpersInt,
    loadingServ: LoadingInt,

    variablesStore: ZustandStore<VariablesStatus>,
    regulationsStore: ZustandStore<RegulationsStatus>,
    updateFunctionsStore: ZustandStore<UpdateFunctionsState>,
    controlStore: ZustandStore<ControlStatus>,
    modelInfoStore: ZustandStore<ModelInfoState>,
    modelUndoRedoStore: ZustandStore<UndoRedoState>,
    variablePositionsStore: ZustandStore<VariablePositionsState>
  ) {
    this.Models = new ModelsLM(this, this.loadedModelStore);
    this.Info = new InfoLM(this, modelInfoStore, modelUndoRedoStore);
    this.Variables = new VariablesLM(
      this,
      this.computationManagerServ,
      this.warningServ,
      controlStore,
      regulationsStore,
      updateFunctionsStore,
      variablesStore,
      modelUndoRedoStore,
      variablePositionsStore
    );
    this.UpdateFunctions = new UpdateFunctionsLM(
      this,
      this.computationManagerServ,
      this.warningServ,
      regulationsStore,
      updateFunctionsStore,
      variablesStore,
      modelUndoRedoStore
    );
    this.Regulations = new RegulationsLM(
      this,
      regulationsStore,
      variablesStore,
      modelUndoRedoStore
    );
    this.Control = new ControlLM(
      this,
      this.computationManagerServ,
      controlStore,
      variablesStore,
      modelUndoRedoStore
    );
    this.Import = new ImportLM(
      this,
      this.warningServ,
      this.messageServ,
      loadingServ,
      this.resultsStatusStore,
      variablesStore,
      this.tabStore
    );
    this.Export = new ExportLM(
      this,
      fileHelpersServ,
      this.messageServ,
      controlStore,
      modelInfoStore,
      regulationsStore,
      updateFunctionsStore,
      this.loadedModelStore,
      variablesStore
    );
  }

  // #endregion

  // #region --- Global Live Model Functions ---

  /** True if the model has no variables. */
  public isEmpty(): boolean {
    return this.Variables.isEmpty();
  }

  /** Erase the whole model */
  public clear(): void {
    this.Variables.clear();
    this.modelEditorStatusStore.getState().clear();
  }

  /** Function which blocks model modifications and initializes warnings || shows errors.
   *  Returns true if the model can be modified, false otherwise.
   */
  public modelCanBeModified(computationMode?: ComputationModes): boolean {
    if (this.loadedModelStore.getState().loadedModelType !== 'main') {
      this.messageServ.showError(
        'You can only modify the model in the Model Editor. Please switch to the Model Editor to proceed.'
      );
      return false;
    }
    if (
      this.tabStore
        .getState()
        .existsTabWithType(
          !computationMode
            ? null
            : this.tabOperationsServ.getTabTypeFromComputationMode(
                computationMode
              )
        ) ||
      (!computationMode
        ? Object.values(this.resultsStatusStore.getState().results).some(
            (v) => !!v
          )
        : this.resultsStatusStore.getState().isResultsConflict(computationMode))
    ) {
      if (computationMode) {
        this.warningServ.addRemoveComputationResultsWarning(
          'Modifying the model',
          computationMode
        );
      } else {
        this.warningServ.addModelModificationRemoveAllResultsWarning();
      }

      return false;
    }

    if (this.computationManagerServ.computationIsRunning()) {
      this.messageServ.showError(
        'The model cannot be modified while a computation is running.'
      );
      return false;
    }

    return true;
  }

  // #endregion
}

export default LiveModel;
