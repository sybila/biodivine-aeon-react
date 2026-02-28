import type { EdgeMonotonicity, Regulation } from '../../../../types';

/**
 * Interface for managing regulations in the LiveModel.
 */
export interface RegulationsLMInt {
  // #region --- Regulation Actions ---

  addRegulation(
    modAllowed: boolean,
    regulatorId: number,
    targetId: number,
    isObservable: boolean,
    monotonicity: EdgeMonotonicity
  ): boolean | void;

  removeRegulation(
    regulatorId: number,
    targetId: number,
    force?: boolean
  ): boolean;

  regulationChanged(regulation: Regulation): void;

  // #endregion

  // #region --- Observability ---

  setObservability(
    regulatorId: number,
    targetId: number,
    isObservable: boolean
  ): void;

  toggleObservability(
    regulatorId: number,
    targetId: number,
    force?: boolean
  ): void;

  // #endregion

  // #region --- Monotonicity ---

  setMonotonicity(
    regulatorId: number,
    targetId: number,
    monotonicity: EdgeMonotonicity
  ): void;

  toggleMonotonicity(
    regulatorId: number,
    targetId: number,
    force?: boolean
  ): void;

  // #endregion

  // #region --- Regulation formating ---

  regulationToString(regulation: Regulation): string;

  // #endregion
}
