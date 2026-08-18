import type { Variable } from '../../../types/types';

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

  /** Filters the objects of type T by the search terms created from comma-separated search text string.
   *  @param objects (Array<T>) - objects to be filtered
   *  @param getStringFromObject ((obj: T) => string) - function which converts one object of type T to string, this string is then going to be matched with the search term.
   *  @param searchText (string) - comma-separated string by which objects will be filtered
   *  If last character of searchText is a comma, returns the original array.
   */
  filterObjectsBySearchTerms<T>(
    objects: Array<T>,
    getStringFromObject: (obj: T) => string,
    searchText: string | undefined
  ): T[];

  /** Filters an array of strings by the search terms created from comma-separated search text string.
   *  If last character of searchText is a comma, returns the original array.
   */
  filterStringsBySearchTerms(
    strings: string[],
    searchText: string | undefined
  ): string[];
}
