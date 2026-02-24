import type { Variable } from '../../../types';

/**
 * Interface for search and filter helper utility functions.
 */
export interface SearchAndFilterHelpersInt {
  /** Filters the variables by the search terms created from comma-separated search text string.
   *  If last character of searchText is a comma, returns the original array.
   */
  filterVariablesBySearchTerms(
    variables: Variable[],
    searchText: string | undefined
  ): Variable[];

  /** Filters an array of strings by the search terms created from comma-separated search text string.
   *  If last character of searchText is a comma, returns the original array.
   */
  filterStringsBySearchTerms(
    strings: string[],
    searchText: string | undefined
  ): string[];
}
