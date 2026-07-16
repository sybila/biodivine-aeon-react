import type { JSX } from 'react';
import type { ControlResult, PertVariableFilterStatus } from '../../types';

/**
 * Interface working with table containing perturbations computed by control computation.
 */
export interface ControlPerturbationsTableInt {
  // #region --- Getters ---

  /** Current max number of perturbations on a page in the Perturbations Table */
  getPageSize(): number;

  // #endregion

  // #region --- Format Perturbation ---

  /** Formats perturbation in a from of array into tuple of two JSX element.
   *  On index 0 the element contains perturbation variables colored (--color-positive for positive, --color-negative for negative),
   *  on index 1 the element contains perturbation variables and their values in text (VariableName: true, VariableName2: false).
   *  Each tuple represents one variable in the perturbation.
   *  @param perturbationArray (Array<[string, boolean]>) -> array containing perturbation formated as array of tuples containing variableName and boolean value to which the variab;e should be fixed
   *  @param  baseTextColor (string) -> css property defining color of the text where its color is not defined by perturbation (ex. empty perturbation)
   */
  formatPerturbation(
    perturbationArray: Array<[string, boolean]>,
    baseTextColor: string,
  ): [JSX.Element, JSX.Element];

  // #endregion

  // #region --- Perturbations Filtering ---

  /** Filters perturbation by different criteria.
   *  Returns true if the perturbation passes the filter, false otherwise.
   */
  filterPerturbation(
    pertInfo: ControlResult,
    minNumInterp: number | undefined,
    minRobust: number | undefined,
    maxSize: number | undefined,
    perturbationVariables: Record<string, PertVariableFilterStatus>
  ): boolean;

  /** Filters perturbations by filter criteria form usePerturbationFilterSortStore.
   *  Returns tuple where on index 0 is the array of filtered perturbations
   *  and on index 1 is boolean indicating if there is next page === there are more perturbations that pass the filter
   */
  filterPerturbations(
    perturbations: Array<ControlResult>
  ): [Array<ControlResult>, boolean];

  // #endregion

  // #region --- Perturbations Sorting ---

  /** Sorts perturbations by primary and secondary sort criteria from usePerturbationFilterSortStore.
   *  Returns new array of sorted perturbations.
   */
  sortPerturbations(perturbations: Array<ControlResult>): Array<ControlResult>;

  // #endregion

  // #region --- Clear ---

  clear(): void;

  // #endregion
}
