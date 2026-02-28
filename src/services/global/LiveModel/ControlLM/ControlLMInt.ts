import type {
  ControlStats,
  Oscillation,
  Phenotype,
  PhenotypeControlEnabledVars,
} from '../../../../types';

/**
 * Interface to manage control information for live model variables */
export interface ControlLMInt {
  // #region --- Getters ---

  /** Returns the number of variables set as Control-Enabled and in Phenotype .
   * @returns A tuple with the first element being the count of Control-Enabled variables,
   * and the second element being the count of variables in Phenotype.
   */
  getNumberOfSetControl(): [number, number];

  /** Returns control statistics for the live model */
  getControlStats(): ControlStats;

  // #endregion

  // #region --- Phenotype and Control-Enabled callbacks ---

  /** Add a callback to be executed when phenotype changes */
  addOnPhenotypeChangeCallback(callback: () => void): void;

  /** Add a callback to be executed when control enabled changes */
  addOnControlChangeCallback(callback: () => void): void;

  // #endregion

  // #region --- Oscillation ---

  /** Sets the currently set phenotype oscillation state */
  setOscillation(oscillation: Oscillation): void;

  /** Returns the currently set phenotype oscillation state */
  getOscillation(): Oscillation;

  // #endregion

  // #region --- Change Control Info ---

  /** Change control information for a variable by its ID */
  changePhenotypeById(id: number, phenotype: Phenotype, force?: boolean): void;

  /** Change variable control enabled state by its ID */
  changeControlEnabledById(
    id: number,
    controlEnabled: boolean,
    force?: boolean
  ): void;

  /** Remove control information for a variable by its ID */
  removeControlInfo(id: number, force?: boolean): void;

  // #endregion

  // #region --- Get Formated Control Info ---

  /** Get Phenotype and Control-Enabled variables formated into object { phenotypeVars: Record<VarName, Phenotype>, controlEnabledVars: Record<VarName, boolean> } */
  getPhenotypeControlEnabledVars(): PhenotypeControlEnabledVars;

  // #endregion
}
