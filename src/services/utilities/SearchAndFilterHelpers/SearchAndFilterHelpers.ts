import type { Variable } from '../../../types/types';
import type { DataFormatersInt } from '../DataFormaters/DataFormatersInt';
import type { SearchAndFilterHelpersInt } from './SearchAndFilterHelpersInt';

class SearchAndFilterHelpers implements SearchAndFilterHelpersInt {
  private dataFormatersServ: DataFormatersInt;

  constructor(dataFormatersServ: DataFormatersInt) {
    this.dataFormatersServ = dataFormatersServ;
  }

  /** Tests if the evaluated string matches any of the search terms in the array */
  private searchInArray(
    evaluatedString: string,
    searchTermAsArray: string[]
  ): boolean {
    const evaluatedStringLowerCase = evaluatedString.toLowerCase();

    for (const searchTerm of searchTermAsArray) {
      if (evaluatedStringLowerCase.includes(searchTerm)) {
        return true;
      }
    }
    return false;
  }

  public filterVariablesBySearchTerms(
    variables: Variable[],
    searchText: string | undefined
  ): Variable[] {
    if (searchText === undefined || searchText === '') return variables;

    const searchTerms =
      this.dataFormatersServ.convertCommaSeparatedStringToArray(
        searchText,
        true
      );

    if (searchTerms[searchTerms.length - 1] === '') {
      return variables;
    }

    return variables.filter((variable) =>
      this.searchInArray(variable.name, searchTerms)
    );
  }

  filterObjectsBySearchTerms<T>(
    objects: Array<T>,
    getStringFromObject: (obj: T) => string,
    searchText: string | undefined
  ): T[] {
    if (searchText === undefined || searchText === '') return objects;

    const searchTerms =
      this.dataFormatersServ.convertCommaSeparatedStringToArray(
        searchText,
        true
      );

    if (searchTerms[searchTerms.length - 1] === '') {
      return objects;
    }

    return objects.filter((obj) =>
      this.searchInArray(getStringFromObject(obj), searchTerms)
    );
  }

  public filterStringsBySearchTerms(
    strings: string[],
    searchText: string | undefined
  ): string[] {
    if (searchText === undefined || searchText === '') return strings;

    const searchTerms =
      this.dataFormatersServ.convertCommaSeparatedStringToArray(
        searchText,
        true
      );

    if (searchTerms[searchTerms.length - 1] === '') {
      return strings;
    }

    return strings.filter((str) => this.searchInArray(str, searchTerms));
  }
}

export default SearchAndFilterHelpers;
