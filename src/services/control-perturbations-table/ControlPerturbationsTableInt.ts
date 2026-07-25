import type { JSX } from 'react';
import type {
  ControlResult,
  PertVariableFilterStatus,
  Phenotype,
} from '../../types';

/**
 * Interface working with table containing perturbations computed by control computation.
 */
export interface ControlPerturbationsTableInt {
  // #region --- Getters ---

  /** Current max number of perturbations on a page in the Perturbations Table */
  getPageSize(): number;

  // #endregion

  // #region --- Format ---

  /** Formats perturbation in a form of array into tuple of two JSX element.
   *  On index 0 the element contains perturbation variables colored (--color-positive for positive, --color-negative for negative),
   *  on index 1 the element contains perturbation variables and their values in text (VariableName: true, VariableName2: false).
   *  Each tuple represents one variable in the perturbation.
   *  @param perturbationArray (Array<[string, boolean]>) -> array containing perturbation formated as array of tuples containing variableName and boolean value to which the variable should be fixed
   *  @param  baseTextColor (string) -> css property defining color of the text where its color is not defined by perturbation (ex. empty perturbation)
   */
  formatPerturbation(
    perturbationArray: Array<[string, boolean]>,
    baseTextColor: string
  ): [JSX.Element, JSX.Element];

  /** Formats phenotype in a form of array into tuple of two JSX element.
   *  On index 0 the element contains phenotype variables colored (--color-positive for positive, --color-negative for negative),
   *  on index 1 the element contains phenotype variables and their values in text (VariableName: true, VariableName2: false).
   *  Each tuple represents one variable in the phenotype.
   *  @param phenotypeArray (Array<[string, Phenotype]>) -> array containing phenotype formated as array of tuples containing variableName and Phenotype value connected with this variable.
   *  @param  baseTextColor (string) -> css property defining color of the text where its color is not defined by phenotyoe status
   */
  formatPhenotype(
    phenotypeArray: Array<[string, Phenotype]>,
    baseTextColor: string
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
