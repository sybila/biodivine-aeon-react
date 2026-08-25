import type { Result } from '../../../../types/result';
import type {
  Oscillation,
  PhenotypeControlEnabledVars,
  PhenotypeStatus,
} from '../../../../types/types';

/**
 * Interface to manage control information for live model variables */
export interface ControlLMInt {
  // #region --- Phenotype and Control-Enabled callbacks ---

  /** Add a callback to be executed when phenotype changes.
   *  @param inputNodes ([number, Phenotype] | null) - optional parameter defining if the callback should run only on subset of variables, if is not specified runs on all the variables
   */
  addOnPhenotypeChangeCallback(
    callback: (inputNodes?: [number, PhenotypeStatus][] | null) => void
  ): void;

  /** Add a callback to be executed when control enabled changes
   * *  @param inputNodes ([number, boolean] | null) - optional parameter defining if the callback should run only on subset of variables, if is not specified runs on all the variables
   */
  addOnControlChangeCallback(
    callback: (inputNodes?: [number, boolean][] | null) => void
  ): void;

  // #endregion

  // #region --- Oscillation ---

  /** Sets the currently set phenotype oscillation state */
  setOscillation(oscillation: Oscillation): void;

  /** Returns the currently set phenotype oscillation state */
  getOscillation(): Oscillation;

  // #endregion

  // #region --- Change Control Info ---

  /**
   * Changes the phenotype status for a variable in the specified phenotype.
   *
   * @param id - The identifier of the variable to change.
   * @param phenotype - The new phenotype status for the variable.
   * @param addIntoUndoRedo - Indicates whether to add the change to the undo/redo history.
   * @param force - Indicates whether to force the change without checking current status.
   * @param phenotypeId - (Optional) The identifier of the phenotype. If not provided, the currently edited phenotype is assumed.
   * @returns An `Ok` result with `true` if the phenotype status was successfully changed,
   * 'Ok' result with `false` if the operation was blocked (shouldn't happen when force is set to true)
   *  or an `Err` result with an error message if there was an issue.
   */
  changePhenotypeById(
    id: number,
    phenotype: PhenotypeStatus,
    addIntoUndoRedo: boolean,
    force: boolean,
    phenotypeId?: number
  ): Result<boolean>;

  /**
   * Changes the control-enabled status of a variable by its ID.
   *
   * @param id - The ID of the variable whose control-enabled status is to be changed.
   * @param controlEnabled - The new control-enabled status to set.
   * @param addIntoUndoRedo - Whether to add this change to the undo/redo stack.
   * @param force - Whether to force the change even if it blocks certain conditions.
   * @returns An `Ok` result with `true` if the control-enabled status was successfully changed,
   * 'Ok' result with `false` if the operation was blocked (shouldn't happen when force is set to true)
   * or an `Err` result with an error message if there was an issue.
   */
  changeControlEnabledById(
    id: number,
    controlEnabled: boolean,
    addIntoUndoRedo: boolean,
    force: boolean
  ): Result<boolean>;

  /** Remove control information for a variable by its ID */
  removeControlInfo(id: number, force?: boolean): void;

  // #endregion

  // #region --- Multiple Phenotypes Operations ---

  /** Changes currently edited phenotype to the phenotype corresponding to the id.
   *  @param id (number) - id of the phenotype which should be the new edited phenotype.
   *  @returns returns Result object with id of the new edited phenotype, if there is an error returns Result object containing error message
   */
  changeCurrentlyEditedPhenotype(id: number): Result<number>;

  /**
 * Creates a new phenotype with an optional name and optional ID.
 *
 * @param addIntoUndoRedo - Whether to add this change to the undo/redo stack.
 * @param phenotypeName (string, optional) - The name of the newly created phenotype. If not provided, a default name will be generated.
 * @param phenotypeId (number | undefined, optional) - The ID of the newly created phenotype. If not provided, a new ID will be generated. Should be used only for undo/redo.
 * @param force (boolean, default: false) - If set to `true`, the change will be forced even if it violates certain conditions.
 *
 * @returns A `Result` object that indicates whether the operation was successful or if an error occurred.
 * - If successful, it returns a `Success` object containing the ID of the new phenotype.
 * - If an error occurs, it returns an `Err` object containing an error message.
 * - If operation was blocked by some other operation, returns 'Success' object containing undefined. This should not happen when force is set to 
true.
 */
  createNewPhenotype(
    addIntoUndoRedo: boolean,
    phenotypeName?: string,
    phenotypeId?: number,
    force?: boolean
  ): Result<number | undefined>;

  /**
   * Renames a phenotype with the specified ID to a new name.
   *
   * @param id (number) - The ID of the phenotype to be renamed.
   * @param newName (string) - The new name for the phenotype.
   * @param addIntoUndoRedo (boolean) - Whether to add this change to the undo/redo stack.
   * @returns A `Result` object indicating the outcome of the operation.
   * - If the operation was successful, returns a `Success` object containing `true`.
   * - If the operation was blocked by another operation, returns a `Success` object containing `false`.
   * - If an error occurs during the process, returns an `Err` object containing an error message.
   */
  renamePhenotype(
    id: number,
    newName: string,
    addIntoUndoRedo: boolean
  ): Result<boolean>;

  /** Deletes phenotype by id.
   *  @param id (number) => id of the phenotype, which should be deleted
   *  @param addIntoUndoRedo (boolean) - Whether to add this change to the undo/redo stack.
   *  @returns A `Result` object indicating the outcome of the operation.
   * - If the operation was successful, returns a `Success` object containing `true`.
   * - If the operation was blocked by another operation, returns a `Success` object containing `false`.
   * - If an error occurs during the process, returns an `Err` object containing an error message.
   */
  removePhenotype(id: number, addIntoUndoRedo: boolean): Result<boolean>;

  // TODO - currently only one phenotype in computation is allowed -- because of that includePhenotypeInComp adds the new phenotype as in computation and removes other phenotypes which were previously included in computations
  /**
   * Adds a phenotype to the set of phenotypes used in computation.
   * @param id (number) - ID of the phenotype to be added.
   * @param addIntoUndoRedo (boolean) - Whether to add this change to the undo/redo stack.
   * @returns A `Result` object indicating the outcome of the operation.
   * - If the operation was successful, returns a `Success` object containing `true`.
   * - If the operation was blocked by another operation, returns a `Success` object containing `false`.
   * - If an error occurs during the process, returns an `Err` object containing an error message.
   */
  includePhenotypeInComp: (
    id: number,
    addIntoUndoRedo: boolean
  ) => Result<boolean>;

  /**
   * Removes a phenotype from the set of phenotypes used in computation.
   * @param id (number) - ID of the phenotype to be removed.
   * @param addIntoUndoRedo (boolean) - Whether to add this change to the undo/redo stack.
   * @returns A `Result` object indicating the outcome of the operation.
   * - If the operation was successful, returns a `Success` object containing `true`.
   * - If the operation was blocked by another operation, returns a `Success` object containing `false`.
   * - If an error occurs during the process, returns an `Err` object containing an error message.
   */
  removePhenotypeFromComp: (
    id: number,
    addIntoUndoRedo: boolean
  ) => Result<boolean>;

  // #endregion

  // #region --- Get Formated Control Info ---

  /** Get Phenotype and Control-Enabled variables formated into object { phenotypeVars: Record<VarName, Phenotype>, controlEnabledVars: Record<VarName, boolean> } */
  getPhenotypeControlEnabledVars(): PhenotypeControlEnabledVars;

  // #endregion
}
