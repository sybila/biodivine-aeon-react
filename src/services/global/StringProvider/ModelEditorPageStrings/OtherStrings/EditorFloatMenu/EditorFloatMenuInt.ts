import type { EdgeMonotonicity } from '../../../../../../types/types';

/** Class which provides strings for the float menu of the model visualization. */
export interface EditorFloatMenuInt {
  // #region --- Variable ---

  editVarName(): string;
  editUpdateFunction(): string;
  removeVar(): string;
  findVarInMenu(): string;

  // #endregion

  // #region --- Regulation ---

  toggleObservability(setObservable: boolean): string;
  toggleMonotonicity(nextMonotocityValue: EdgeMonotonicity): string;
  removeReg(): string;

  // #endregion
}
