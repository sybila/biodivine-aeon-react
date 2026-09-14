import SelectionButtonsTooltips from '../../common-tooltips/SelectionButtonTooltips';
import type { TooltipsInt } from './TooltipsInt';

class Tooltips extends SelectionButtonsTooltips implements TooltipsInt {
  // #region --- Filters ---
  changeVariableFilterStatus(varFilterStatus: string): string {
    return `Set selected variables to be considered by filter as '${varFilterStatus}'`;
  }
  applyFilters(): string {
    return 'Apply currently set filters.';
  }
  // #endregion

  // #region --- Sorting ---

  changeSortDirection(): string {
    return 'Change sort direction (ascending/descending).';
  }
  changeSortingAttribute(): string {
    return 'Change attribute by which perturbations will be sorted.';
  }
  applySorts(): string {
    return 'Sort perturbations using currently set parameters.';
  }

  // #endregion

  // #region --- Paging ---
  nextPage(isAvailable: boolean): string {
    return isAvailable ? 'Go to next page.' : 'Next page not available.';
  }
  previousPage(isAvailable: boolean): string {
    return isAvailable
      ? 'Go to previous page.'
      : 'Previous page not available.';
  }
  pageIndicator(): string {
    return 'Current page.';
  }
  // #endregion

  // #region --- Perturbation Table ---
  idHeader(): string {
    return 'Unique identificator of perturbation.';
  }
  perturbationHeader(): string {
    return 'Perturbed variables and states to which they are fixed. (Click to change text format of all perturbations)';
  }
  perturbationSizeHeader(): string {
    return 'Number of variables in perturbation.';
  }
  numberOfInterpretationHeader(): string {
    return 'Number of models interpretations for which perturbation is valid.';
  }
  robustnessHeader(): string {
    return 'Percentage of models interpretations for which perturbation is valid.';
  }
  // #endregion
}

export default Tooltips;
