import { Message } from '../../../components/lit-components/message-wrapper';
import useResultsStatus from '../../../stores/ComputationManager/ResultStatus/useResultsStatus';
import useControlStore from '../../../stores/LiveModel/ControlStore/useControlStore';
import useLoadedModelStore from '../../../stores/LiveModel/LoadedModelStore/useLoadedModelStore';
import useModelInfoStore from '../../../stores/LiveModel/ModelInfoStore/useModelInfoStore';
import useRegulationsStore from '../../../stores/LiveModel/RegulationsStore/useRegulationsStore';
import useUpdateFunctionsStore from '../../../stores/LiveModel/UpdateFunctionsStore/useUpdateFunctionsStore';
import useVariablesStore from '../../../stores/LiveModel/VariablesStore/useVariablesStore';
import useModelEditorStatus from '../../../stores/ModelEditor/useModelEditorStatus';
import useTabsStore from '../../../stores/Navigation/useTabsStore';
import FileHelpers from '../../utilities/FileHelpers/FileHelpers';
import ComputationManager from '../ComputationManager/ComputationManager';
import Warning from '../Warning/Warning';
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

  constructor() {
    useTabsStore.getState().firstTabOnClick = () => {
      this.Models.loadModel(0);
    };

    ComputationManager.setLiveModel(this);
  }

  // #endregion

  // #region --- Submodules ---

  /** Functions and properties for managing multiple models. */
  Models: ModelsLMInt = new ModelsLM(this);

  /** Functions and properties for managing model information such as name and description. */
  Info: InfoLMInt = new InfoLM(this, useModelInfoStore);

  /** Functions and properties used for operations with variables of the model. (adding, removing, renaming, getting all,...)*/
  Variables: VariablesLMInt = new VariablesLM(this);

  /** Functions and properties used for operations with variables update functions. (setting, validating, updating,...) */
  UpdateFunctions: UpdateFunctionsLMInt = new UpdateFunctionsLM(this);

  /** Functions and properties used for operations with regulations. (adding, removing, setting observability,...) */
  Regulations: RegulationsLMInt = new RegulationsLM(this);

  /** Functions connected with setting control parameters of the models variables. */
  Control: ControlLMInt = new ControlLM(
    this,
    ComputationManager,
    useControlStore,
    useVariablesStore
  );

  /** Functions used when importing model from Aeon format. */
  Import: ImportLMInt = new ImportLM(
    this,
    Warning,
    useResultsStatus,
    useVariablesStore,
    useTabsStore
  );

  /** Functions used for export of the model. */
  Export: ExportLMInt = new ExportLM(
    this,
    FileHelpers,
    useControlStore,
    useModelInfoStore,
    useRegulationsStore,
    useUpdateFunctionsStore,
    useLoadedModelStore,
    useVariablesStore
  );

  // #endregion

  // #region --- Global Live Model Functions ---

  /** True if the model has no variables. */
  public isEmpty(): boolean {
    return this.Variables.isEmpty();
  }

  /** Erase the whole model */
  public clear(): void {
    LiveModel.Variables.clear();
    useModelEditorStatus.getState().clear();
  }

  /** Function which blocks model modifications and initializes warnings || shows errors.
   *  Returns true if the model can be modified, false otherwise.
   */
  public modelCanBeModified(): boolean {
    if (useLoadedModelStore.getState().loadedModelType !== 'main') {
      Message.showError(
        'You can only modify the model in the Model Editor. Please switch to the Model Editor to proceed.'
      );
      return false;
    }
    if (
      !useTabsStore.getState().isEmpty() ||
      useResultsStatus.getState().results !== undefined
    ) {
      Warning.addModelModificationRemoveResultsWarning();
      return false;
    }

    if (ComputationManager.computationIsRunning()) {
      Message.showError(
        'The model cannot be modified while a computation is running.'
      );
      return false;
    }

    return true;
  }

  // #endregion
}

const LiveModel = new LiveModelClass();

export { LiveModel, LiveModelClass };
