import type { PageSelectorTooltipsInt } from '../../common-tooltips/PageSelectorTooltips/PageSelectorTooltipsInt';
import type { SelectionButtonsTooltipsInt } from '../../common-tooltips/SelectionButtonsTooltips/SelectionButtonsTooltipsInt';

/** Class which provides tooltips for the control perturbation table page. */
export interface TooltipsInt extends SelectionButtonsTooltipsInt, PageSelectorTooltipsInt {
  // #region --- Filters ---

  changeVariableFilterStatus(varFilterStatus: string): string;
  applyFilters(): string;

  // #endregion

  // #region --- Sorting ---

  changeSortDirection(): string;
  changeSortingAttribute(): string;
  applySorts(): string;

  // #endregion

  // #region --- Perturbation Table ---

  idHeader(): string;
  perturbationHeader(): string;
  perturbationSizeHeader(): string;
  numberOfInterpretationHeader(): string;
  robustnessHeader(): string;

  // #endregion
}
