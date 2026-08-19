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

  /** Create new phenotype with name specified by phenotypeName.
   *  @param phenotypeName (string) - optional name of the newly created phenotype, if is not same defaul name is constructed.
   *  @returns returns Result object with  id of the new phenotype, if there is an error returns Result object containing error message
   */
  createNewPhenotype(phenotypeName?: string): Result<number>;

  /** Renames phenotype with id to newName.
   *  @param id (number) = id of the phenotype to be renamed.
   *  @param newName (string) = newName for the phenotype
   * @returns
   * - If successful, returns a `Result` object containing the string `newName`.
   * - If an error occurs during the process, shows an error message and returns an undefined `Result` object.
   */
  renamePhenotype(id: number, newName: string): Result<string>;

  /** Deletes phenotype by id.
   *  @param id (number) => id of the phenotype, which should be deleted
   * @returns
   * - If successful, returns a `Result` object containing the number `id` of the deleted phenotype.
   * - If an error occurs during the deletion process, shows an error message and returns an undefined `Result` object.
   */
  removePhenotype(id: number): Result<number>;

  // #endregion

  // #region --- Get Formated Control Info ---

  /** Get Phenotype and Control-Enabled variables formated into object { phenotypeVars: Record<VarName, Phenotype>, controlEnabledVars: Record<VarName, boolean> } */
  getPhenotypeControlEnabledVars(): PhenotypeControlEnabledVars;

  // #endregion
}
