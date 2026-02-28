import type { ControlLMInt } from './ControlLM/ControlLMInt';
import type { ExportLMInt } from './ExportLM/ExportLMInt';
import type { ImportLMInt } from './ImportLM/ImportLMInt';
import type { InfoLMInt } from './InfoLM/InfoLMInt';
import type { ModelsLMInt } from './ModelsLM/ModelsLMInt';
import type { RegulationsLMInt } from './RegulationsLM/RegulationsLMInt';
import type { UpdateFunctionsLMInt } from './UpdateFunctionsLM/UpdateFunctionsLMInt';
import type { VariablesLMInt } from './VariablesLM/VariablesLMInt';

/**
	Stores the PBN currently loaded into the editor. This is what you should interact with when
	you want to modify the model, not the editor or graph directly.

	It is the responsibility of the `LiveModel` to always update `ModelEditor` and `ModelVisualization`
	to reflect the current state of the model.
*/
export interface LiveModelInt {
  // #region --- Properties ---

  /** We use this to indicate that there is a batch of changes to the model that are being processed,
	and we therefore shouldn't run intensive tasks (like function consistency checks on server).
	It is the responsibility of the user of this flag to re-run these tasks AFTER the changes are done.
	Currently we use this only in import. */
  disable_dynamic_validation: boolean;

  // #endregion

  // #region --- Submodules ---

  /** Functions and properties for managing multiple models. */
  Models: ModelsLMInt;

  /** Functions and properties for managing model information such as name and description. */
  Info: InfoLMInt;

  /** Functions and properties used for operations with variables of the model. (adding, removing, renaming, getting all,...)*/
  Variables: VariablesLMInt;

  /** Functions and properties used for operations with variables update functions. (setting, validating, updating,...) */
  UpdateFunctions: UpdateFunctionsLMInt;

  /** Functions and properties used for operations with regulations. (adding, removing, setting observability,...) */
  Regulations: RegulationsLMInt;

  /** Functions connected with setting control parameters of the models variables. */
  Control: ControlLMInt;

  /** Functions used when importing model from Aeon format. */
  Import: ImportLMInt;

  /** Functions used for export of the model. */
  Export: ExportLMInt;

  // #endregion

  // #region --- Global Live Model Functions ---

  /** True if the model has no variables. */
  isEmpty(): boolean;

  /** Erase the whole model */
  clear(): void;

  /** Function which blocks model modifications and initializes warnings || shows errors.
   *  Returns true if the model can be modified, false otherwise.
   */
  modelCanBeModified(): boolean;

  // #endregion
}
