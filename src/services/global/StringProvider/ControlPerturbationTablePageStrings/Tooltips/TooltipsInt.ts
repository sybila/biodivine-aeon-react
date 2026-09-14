import type { SelectionButtonsTooltipsInt } from '../../common-tooltips/SelectionButtonsTooltipsInt';

/** Class which provides tooltips for the control perturbation table page. */
export interface TooltipsInt extends SelectionButtonsTooltipsInt {
  // #region --- Filters ---

  changeVariableFilterStatus(varFilterStatus: string): string;
  applyFilters(): string;

  // #endregion

  // #region --- Sorting ---

  changeSortDirection(): string;
  changeSortingAttribute(): string;
  applySorts(): string;

  // #endregion

  // #region --- Paging ---

  nextPage(isAvailable: boolean): string;
  previousPage(isAvailable: boolean): string;
  pageIndicator(): string;

  // #endregion

  // #region --- Perturbation Table ---

  idHeader(): string;
  perturbationHeader(): string;
  perturbationSizeHeader(): string;
  numberOfInterpretationHeader(): string;
  robustnessHeader(): string;

  // #endregion
}
