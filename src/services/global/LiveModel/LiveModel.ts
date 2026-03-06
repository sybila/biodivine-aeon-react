import { Message } from '../../../components/lit-components/message-wrapper';
import type { ResultsStatus } from '../../../stores/ComputationManager/ResultStatus/ResultStatus';
import useResultsStatus from '../../../stores/ComputationManager/ResultStatus/useResultsStatus';
import type { ControlStatus } from '../../../stores/LiveModel/ControlStore/ControlStatus';
import useControlStore from '../../../stores/LiveModel/ControlStore/useControlStore';
import type { ModelState } from '../../../stores/LiveModel/LoadedModelStore/ModelState';
import useLoadedModelStore from '../../../stores/LiveModel/LoadedModelStore/useLoadedModelStore';
import type { ModelInfoState } from '../../../stores/LiveModel/ModelInfoStore/ModelInfoState';
import useModelInfoStore from '../../../stores/LiveModel/ModelInfoStore/useModelInfoStore';
import type { RegulationsStatus } from '../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import useRegulationsStore from '../../../stores/LiveModel/RegulationsStore/useRegulationsStore';
import type { UpdateFunctionsState } from '../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import useUpdateFunctionsStore from '../../../stores/LiveModel/UpdateFunctionsStore/useUpdateFunctionsStore';
import useVariablesStore from '../../../stores/LiveModel/VariablesStore/useVariablesStore';
import type { VariablesStatus } from '../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../../stores/ModelEditor/ModelEditorStatus';
import useModelEditorStatus from '../../../stores/ModelEditor/useModelEditorStatus';
import type { TabsState } from '../../../stores/Navigation/TabState';
import useTabsStore from '../../../stores/Navigation/useTabsStore';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import FileHelpers from '../../utilities/FileHelpers/FileHelpers';
import type { FileHelpersInt } from '../../utilities/FileHelpers/FileHelpersInt';
import ComputationManager from '../ComputationManager/ComputationManager';
import type { ComputationManagerInt } from '../ComputationManager/ComputationManagerInt';
import Warning from '../Warning/Warning';
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
class LiveModelClass implements LiveModelInt {
  // #region --- Properties + Constructor ---

  /** We use this to indicate that there is a batch of changes to the model that are being processed,
	and we therefore shouldn't run intensive tasks (like function consistency checks on server).
	It is the responsibility of the user of this flag to re-run these tasks AFTER the changes are done.
	Currently we use this only in import. */
  public disable_dynamic_validation: boolean = false;

  private computationManagerServ: ComputationManagerInt;
  private warningServ: WarningInt;

  private loadedModelStore: ZustandStore<ModelState>;
  private tabStore: ZustandStore<TabsState>;
  private resultsStatusStore: ZustandStore<ResultsStatus>;
  private modelEditorStatusStore: ZustandStore<ModelEditorStatus>;

  constructor(
    computationManagerServ: ComputationManagerInt,
    warningServ: WarningInt,
    fileHelpersServ: FileHelpersInt,
    loadedModelStore: ZustandStore<ModelState>,
    tabStore: ZustandStore<TabsState>,
    resultsStatusStore: ZustandStore<ResultsStatus>,
    modelEditorStatusStore: ZustandStore<ModelEditorStatus>,
    variablesStore: ZustandStore<VariablesStatus>,
    regulationsStore: ZustandStore<RegulationsStatus>,
    updateFunctionsStore: ZustandStore<UpdateFunctionsState>,
    controlStore: ZustandStore<ControlStatus>,
    modelInfoStore: ZustandStore<ModelInfoState>
  ) {
    this.computationManagerServ = computationManagerServ;
    this.warningServ = warningServ;

    this.loadedModelStore = loadedModelStore;
    this.tabStore = tabStore;
    this.resultsStatusStore = resultsStatusStore;
    this.modelEditorStatusStore = modelEditorStatusStore;

    this.intializeSubmodules(
      fileHelpersServ,
      variablesStore,
      regulationsStore,
      updateFunctionsStore,
      controlStore,
      modelInfoStore
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
    variablesStore: ZustandStore<VariablesStatus>,
    regulationsStore: ZustandStore<RegulationsStatus>,
    updateFunctionsStore: ZustandStore<UpdateFunctionsState>,
    controlStore: ZustandStore<ControlStatus>,
    modelInfoStore: ZustandStore<ModelInfoState>
  ) {
    this.Models = new ModelsLM(this, this.loadedModelStore);
    this.Info = new InfoLM(this, modelInfoStore);
    this.Variables = new VariablesLM(
      this,
      this.computationManagerServ,
      this.warningServ,
      controlStore,
      regulationsStore,
      updateFunctionsStore,
      variablesStore
    );
    this.UpdateFunctions = new UpdateFunctionsLM(
      this,
      this.computationManagerServ,
      this.warningServ,
      regulationsStore,
      updateFunctionsStore,
      variablesStore
    );
    this.Regulations = new RegulationsLM(
      this,
      regulationsStore,
      variablesStore
    );
    this.Control = new ControlLM(
      this,
      this.computationManagerServ,
      controlStore,
      variablesStore
    );
    this.Import = new ImportLM(
      this,
      this.warningServ,
      this.resultsStatusStore,
      variablesStore,
      this.tabStore
    );
    this.Export = new ExportLM(
      this,
      fileHelpersServ,
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
  public modelCanBeModified(): boolean {
    if (this.loadedModelStore.getState().loadedModelType !== 'main') {
      Message.showError(
        'You can only modify the model in the Model Editor. Please switch to the Model Editor to proceed.'
      );
      return false;
    }
    if (
      !this.tabStore.getState().isEmpty() ||
      this.resultsStatusStore.getState().results !== undefined
    ) {
      this.warningServ.addModelModificationRemoveResultsWarning();
      return false;
    }

    if (this.computationManagerServ.computationIsRunning()) {
      Message.showError(
        'The model cannot be modified while a computation is running.'
      );
      return false;
    }

    return true;
  }

  // #endregion
}

const LiveModel = new LiveModelClass(
  ComputationManager,
  Warning,
  FileHelpers,
  useLoadedModelStore,
  useTabsStore,
  useResultsStatus,
  useModelEditorStatus,
  useVariablesStore,
  useRegulationsStore,
  useUpdateFunctionsStore,
  useControlStore,
  useModelInfoStore
);

export { LiveModel, LiveModelClass };
