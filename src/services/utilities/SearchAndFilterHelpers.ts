import type { Variable } from '../../types';
import DataFormaters from './DataFormaters';

class SearchAndFilterHelpers {
  /** Tests if the evaluated string starts with any of the search terms in the array */
  private static startsWithInArray(
    evaluatedString: string,
    searchTermAsArray: string[]
  ): boolean {
    for (const searchTerm of searchTermAsArray) {
      if (evaluatedString.startsWith(searchTerm)) {
        return true;
      }
    }
    return false;
  }

  /** Filters the variables by the search terms created from comma-separated search text string.
   *  If last character of searchText is a comma, returns the original array.
   */
  public static filterVariablesBySearchTerms(
    variables: Variable[],
    searchText: string | undefined
  ): Variable[] {
    if (searchText === undefined || searchText === '') return variables;

    const searchTerms =
      DataFormaters.convertCommaSeparatedStringToArray(searchText);

    if (searchTerms[searchTerms.length - 1] === '') {
      return variables;
    }

    return variables.filter((variable) =>
      SearchAndFilterHelpers.startsWithInArray(variable.name, searchTerms)
    );
  }

  /** Filters an array of strings by the search terms created from comma-separated search text string.
   *  If last character of searchText is a comma, returns the original array.
   */
  public static filterStringsBySearchTerms(
    strings: string[],
    searchText: string | undefined
  ): string[] {
    if (searchText === undefined || searchText === '') return strings;

    const searchTerms =
      DataFormaters.convertCommaSeparatedStringToArray(searchText);

    if (searchTerms[searchTerms.length - 1] === '') {
      return strings;
    }

    return strings.filter((str) =>
      SearchAndFilterHelpers.startsWithInArray(str, searchTerms)
    );
  }
}

export default SearchAndFilterHelpers;
