import { Message } from '../../../components/lit-components/message-wrapper';
import useResultsStatus from '../../../stores/ComputationManager/useResultsStatus';
import useLoadedModelStore from '../../../stores/LiveModel/useLoadedModelStore';
import useModelEditorStatus from '../../../stores/ModelEditor/useModelEditorStatus';
import useTabsStore from '../../../stores/Navigation/useTabsStore';
import ComputationManager from '../ComputationManager/ComputationManager';
import Warning from '../Warning/Warning';
import ControlLM from './ControlLM';
import ExportLM from './ExportLM';
import ImportLM from './ImportLM';
import InfoLM from './InfoLM';
import ModelsLM from './ModelsLM';
import RegulationsLM from './RegulationsLM';
import UpdateFunctionsLM from './UpdateFunctionsLM';
import VariablesLM from './VariablesLM';

//import { ModelEditor, PhenotypeEditor, ControllableEditor  } from "./Todo-imports";

/**
	Stores the PBN currently loaded into the editor. This is what you should interact with when
	you want to modify the model, not the editor or graph directly.

	It is the responsibility of the `LiveModel`` to always update `ModelEditor` and `CytoscapeME`
	to reflect the current state of the model.
*/
class LiveModelClass {
  /** We use this to indicate that there is a batch of changes to the model that are being processed,
	and we therefore shouldn't run intensive tasks (like function consistency checks on server).
	It is the responsibility of the user of this flag to re-run these tasks AFTER the changes are done.
	Currently we use this only in import. */
  public _disable_dynamic_validation: boolean = false;

  /** Functions and properties for managing multiple models. */
  Models: ModelsLM = new ModelsLM(this);

  /** Functions and properties for managing model information such as name and description. */
  Info: InfoLM = new InfoLM(this);

  /** Functions and properties used for operations with variables of the model. (adding, removing, renaming, getting all,...)*/
  Variables: VariablesLM = new VariablesLM(this);

  /** Functions and properties used for operations with variables update functions. (setting, validating, updating,...) */
  UpdateFunctions: UpdateFunctionsLM = new UpdateFunctionsLM(this);

  /** Functions and properties used for operations with regulations. (adding, removing, setting observability,...) */
  Regulations: RegulationsLM = new RegulationsLM(this);

  /** Functions connected with setting control parameters of the models variables. */
  Control: ControlLM = new ControlLM(this);

  /** Functions used when importing model from Aeon format. */
  Import: ImportLM = new ImportLM(this);

  /** Functions used for export of the model. */
  Export: ExportLM = new ExportLM(this);

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
}

const LiveModel = new LiveModelClass();

export { LiveModel, LiveModelClass };
