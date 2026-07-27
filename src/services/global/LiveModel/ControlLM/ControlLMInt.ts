import type {
  Oscillation,
  PhenotypeControlEnabledVars,
  PhenotypeStatus,
} from '../../../../types';

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

  /** Change control information for a variable by its ID */
  changePhenotypeById(
    id: number,
    phenotype: PhenotypeStatus,
    addIntoUndoRedo: boolean,
    force: boolean
  ): void;

  /** Change variable control enabled state by its ID */
  changeControlEnabledById(
    id: number,
    controlEnabled: boolean,
    addIntoUndoRedo: boolean,
    force: boolean
  ): void;

  /** Remove control information for a variable by its ID */
  removeControlInfo(id: number, force?: boolean): void;

  // #endregion

  // #region --- Multiple Phenotypes Operations ---

  /** Changes currently active phenotype to the phenotype corresponding to the id.
   *  @param id (number) - id of the phenotype which should be the new active phenotype.
   *  @returns returns id of the new active phenotype, if phenotype with this id doesnt exist returns undefined
   */
  changeCurrentlyActivePhenotype(id: number): number | undefined;

  // #endregion

  // #region --- Get Formated Control Info ---

  /** Get Phenotype and Control-Enabled variables formated into object { phenotypeVars: Record<VarName, Phenotype>, controlEnabledVars: Record<VarName, boolean> } */
  getPhenotypeControlEnabledVars(): PhenotypeControlEnabledVars;

  // #endregion
}
