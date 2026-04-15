import type { ComputationModes } from '../../../types';

/**
 * Interface for creation and management of warnings in the application
 */
export interface WarningInt {
  // #region --- Starting Computation Warning ---

  /** Adds a warning about starting a new computation that will clear results and close tabs. */
  addStartComputationResultsWarning(computationFunction: () => void): void;

  // #endregion

  // #region --- Import Model Warnings ---

  /** Adds a warning about importing a new model that will erase the current model.
   *  Returns a promise that resolves to true if the user proceeds, false otherwise.
   */
  addImportModelEraseModelWarning(): Promise<boolean>;

  // #endregion

  // #region --- Variable Warnings ---

  /** Adds a warning about removing a variable and its associated regulations.
   *  @param variableName - The name of the variable to be removed.
   *  Returns a promise that resolves to true if the user proceeds, false otherwise.
   */
  addRemoveVariableWarning(variableName: string): Promise<boolean>;

  // #endregion

  // #region --- Regulation Warnings ---

  /** Adds a warning about creating a missing regulation. */
  addCreateMissingRegulationWarning(
    regulatorName: string,
    targetName: string,
    createFunction: () => void
  ): void;

  // #endregion

  // #region --- Model Modification Warning ---

  /** Adds a warning that modifying the model will clear the results and close all tabs except for the Model Editor tab. */
  addModelModificationRemoveAllResultsWarning(): void;

  /** Adds a warning that performing operation will clear the results and close all tabs connected with computation type.
   *  @param operation - The operation being performed that is causing the warning (ex. "Removing variable X", "Changing regulation Y") - this will be included in the warning text to clarify what action is causing the results to be removed.
   *  @param computationMode - The computation type of the results that will be affected (ex. "Attractor Analysis", "Control")
   */
  addRemoveComputationResultsWarning(
    operation: string,
    computationMode: ComputationModes
  ): void;

  // #endregion

  // #region --- Universal Warnings ---

  /** Adds a warning that performing operation will clear the results and close all tabs except for the Model Editor tab.
   *  Returns a promise that resolves to true if the user proceeds, false otherwise.
   */
  addRemoveResultsWarning(operation: string): Promise<boolean>;

  // #endregion
}
