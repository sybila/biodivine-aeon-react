import type { JSX } from 'react';
import usePerturbationFilterSortStore from '../../stores/ControlPerturbationsTable/usePerturbationsFilterSortStore';
import {
  PertVariableFilterStatus,
  type ControlResult,
  type PertTableSort,
  type Perturbation,
} from '../../types';

class ControlPerturbationsTable {
  // #region --- Properties ---

  /** Current max number of perturbations on a page in the Perturbations Table */
  private static pageSize: number = 100;

  // #endregion

  // #region --- Getters ---

  public static getPageSize(): number {
    return this.pageSize;
  }

  // #endregion

  // #region --- Format Perturbation ---

  /** Formats perturbation in a from of array into tuple of two JSX element.
   *  On index 0 the element contains perturbation variables colored (green for positive, red for negative),
   *  on index 1 the element contains perturbation variables and their values in text (VariableName: true, VariableName2: false).
   *  Each tuple represents one variable in the perturbation.
   */
  public static formatPerturbation(
    perturbationArray: Array<[string, boolean]>
  ): [JSX.Element, JSX.Element] {
    if (perturbationArray.length === 0) {
      return [
        <span className="flex flex-row h-full w-fit text-black">{'{ }'}</span>,
        <span className="flex flex-row h-full w-fit text-black">
          No Perturbation
        </span>,
      ];
    }

    const coloredPerturbation: Array<JSX.Element> = [];
    const textPerturbation: Array<JSX.Element> = [];

    perturbationArray.forEach(([key, value], index) => {
      coloredPerturbation.push(
        <div key={key} className="flex flex-row h-full w-fit whitespace-nowrap">
          <span
            style={{
              color: `${value ? 'var(--color-green)' : 'var(--color-red)'}`,
            }}
          >
            {key}
          </span>
          {index < perturbationArray.length - 1 && <span>,</span>}
        </div>
      );

      textPerturbation.push(
        <div key={key} className="flex flex-row h-full w-fit whitespace-nowrap">
          <span className="">{`${key}: ${value ? 'true' : 'false'}`}</span>
          {index < perturbationArray.length - 1 && <span>,</span>}
        </div>
      );
    });

    return [
      <div className="flex flex-row h-full w-fit gap-1">
        {coloredPerturbation}
      </div>,
      <div className="flex flex-row h-full w-fit gap-1 text-black">
        {textPerturbation}
      </div>,
    ];
  }

  // #endregion

  // #region --- Perturbations Filtering ---

  /** Filters perturbations by variables they contain and their perturbation status. */
  private static filterOutPertByVariables(
    perturbation: Perturbation,
    perturbationFilterVariables: Record<string, PertVariableFilterStatus>
  ): boolean {
    for (const [filterVarName, filterVarStatus] of Object.entries(
      perturbationFilterVariables
    )) {
      const pertVarStatus: boolean = perturbation[filterVarName];
      if (pertVarStatus === undefined || pertVarStatus === null) return true;

      if (
        filterVarStatus ===
        PertVariableFilterStatus.IN_FILTER_POSITIVELY_PERTURBED
      ) {
        if (!pertVarStatus) return true;
      } else if (
        filterVarStatus ===
        PertVariableFilterStatus.IN_FILTER_NEGATIVELY_PERTURBED
      ) {
        if (pertVarStatus) return true;
      }
    }
    return false;
  }

  /** Filters perturbation by different criteria.
   *  Returns true if the perturbation passes the filter, false otherwise.
   */
  public static filterPerturbation = (
    pertInfo: ControlResult,
    minNumInterp: number | undefined,
    minRobust: number | undefined,
    maxSize: number | undefined,
    perturbationVariables: Record<string, PertVariableFilterStatus>
  ) => {
    return !(
      (minNumInterp && pertInfo.color_count < minNumInterp) ||
      (minRobust && pertInfo.robustness < minRobust) ||
      (maxSize && Object.keys(pertInfo.perturbation).length > maxSize) ||
      this.filterOutPertByVariables(
        pertInfo.perturbation,
        perturbationVariables
      )
    );
  };

  /** Filters perturbations by filter criteria form usePerturbationFilterSortStore.
   *  Returns tuple where on index 0 is the array of filtered perturbations
   *  and on index 1 is boolean indicating if there is next page === there are more perturbations that pass the filter
   */
  public static filterPerturbations(
    perturbations: Array<ControlResult>
  ): [Array<ControlResult>, boolean] {
    const filterState = usePerturbationFilterSortStore.getState();
    const startingIndex = (filterState.pageNumber - 1) * this.pageSize;
    const minNumberOfInterpretations = filterState.minNumberOfInterpretations;
    const minRobustness = filterState.minRobustness;
    const maxSize = filterState.maxSize;
    const perturbationVariables = filterState.perturbationVariables;

    const filteredPerturbations: Array<ControlResult> = [];

    for (let index = startingIndex; index < perturbations.length; index++) {
      if (filteredPerturbations.length >= this.pageSize) {
        return [filteredPerturbations, true];
      }

      if (
        this.filterPerturbation(
          perturbations[index],
          minNumberOfInterpretations,
          minRobustness,
          maxSize,
          perturbationVariables
        )
      ) {
        filteredPerturbations.push(perturbations[index]);
      }
    }

    return [filteredPerturbations, false];
  }
  // #endregion

  // #region --- Perturbations Sorting ---

  /** Compares two perturbations by their ID. */
  private static compareById = (
    pertA: ControlResult,
    pertB: ControlResult
  ): number => {
    return pertA.id - pertB.id;
  };

  /** Compares two perturbations by their size (number of variables in the perturbation).
   *  Used for sorting perturbations.
   */
  private static compareBySize = (
    pertA: ControlResult,
    pertB: ControlResult
  ): number => {
    return (
      Object.keys(pertA.perturbation).length -
      Object.keys(pertB.perturbation).length
    );
  };

  /** Compares two perturbations by their number of interpretations. */
  private static compareByInterpretations = (
    pertA: ControlResult,
    pertB: ControlResult
  ): number => {
    return pertA.color_count - pertB.color_count;
  };

  private static comparePerturbations = (
    pertA: ControlResult,
    pertB: ControlResult,
    sort: PertTableSort
  ): number => {
    switch (sort.field) {
      case 'size':
        return this.compareBySize(pertA, pertB);
      case 'interpretations':
        return this.compareByInterpretations(pertA, pertB);
      default:
        return this.compareById(pertA, pertB);
    }
  };

  /** Sorts perturbations by primary and secondary sort criteria from usePerturbationFilterSortStore.
   *  Returns new array of sorted perturbations.
   */
  public static sortPerturbations(
    perturbations: Array<ControlResult>
  ): Array<ControlResult> {
    const sortState = usePerturbationFilterSortStore.getState();
    const primarySort = sortState.primarySort ?? {
      field: 'id',
      direction: 'asc',
    };
    const secondarySort = sortState.secondarySort ?? {
      field: 'id',
      direction: 'asc',
    };

    const sortedPerturbations = [...perturbations];

    sortedPerturbations.sort((pertA, pertB) => {
      let comparison = this.comparePerturbations(pertA, pertB, primarySort);
      if (comparison === 0 && primarySort.field !== secondarySort.field) {
        comparison = this.comparePerturbations(pertA, pertB, secondarySort);
        return secondarySort.direction === 'asc' ? comparison : -comparison;
      } else {
        return primarySort.direction === 'asc' ? comparison : -comparison;
      }
    });

    return sortedPerturbations;
  }

  // #endregion
}

export default ControlPerturbationsTable;
