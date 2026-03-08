import type { Variable } from '../../../types';
import type { DataFormatersInt } from '../DataFormaters/DataFormatersInt';
import type { SearchAndFilterHelpersInt } from './SearchAndFilterHelpersInt';

class SearchAndFilterHelpers implements SearchAndFilterHelpersInt {
  private dataFormatersServ: DataFormatersInt;

  constructor(dataFormatersServ: DataFormatersInt) {
    this.dataFormatersServ = dataFormatersServ;
  }

  /** Tests if the evaluated string starts with any of the search terms in the array */
  private startsWithInArray(
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
  public filterVariablesBySearchTerms(
    variables: Variable[],
    searchText: string | undefined
  ): Variable[] {
    if (searchText === undefined || searchText === '') return variables;

    const searchTerms =
      this.dataFormatersServ.convertCommaSeparatedStringToArray(searchText);

    if (searchTerms[searchTerms.length - 1] === '') {
      return variables;
    }

    return variables.filter((variable) =>
      this.startsWithInArray(variable.name, searchTerms)
    );
  }

  /** Filters an array of strings by the search terms created from comma-separated search text string.
   *  If last character of searchText is a comma, returns the original array.
   */
  public filterStringsBySearchTerms(
    strings: string[],
    searchText: string | undefined
  ): string[] {
    if (searchText === undefined || searchText === '') return strings;

    const searchTerms =
      this.dataFormatersServ.convertCommaSeparatedStringToArray(searchText);

    if (searchTerms[searchTerms.length - 1] === '') {
      return strings;
    }

    return strings.filter((str) => this.startsWithInArray(str, searchTerms));
  }
}

export default SearchAndFilterHelpers;
