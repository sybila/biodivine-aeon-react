import type { JSX } from 'react';
import type { PerturbationFiltersSortState } from '../../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/PerturbationsFilterSortState';
import type { ZustandStore } from '../../stores/ZustandStoreType';
import {
  PertVariableFilterStatus,
  type ControlResult,
  type PertTableSort,
  type Perturbation,
  type Phenotype,
} from '../../types';
import type { ControlPerturbationsTableInt } from './ControlPerturbationsTableInt';

class ControlPerturbationsTable implements ControlPerturbationsTableInt {
  // #region --- Properties + Constructor ---

  /** Current max number of perturbations on a page in the Perturbations Table */
  private pageSize: number = 100;

  private perturbationFilterSortStore: ZustandStore<PerturbationFiltersSortState>;

  constructor(
    perturbationFilterSortStore: ZustandStore<PerturbationFiltersSortState>
  ) {
    this.perturbationFilterSortStore = perturbationFilterSortStore;
  }

  // #endregion

  // #region --- Getters ---

  public getPageSize(): number {
    return this.pageSize;
  }

  // #endregion

  // #region --- Format ---

  public formatPerturbation(
    perturbationArray: Array<[string, boolean]>,
    baseTextColor: string
  ): [JSX.Element, JSX.Element] {
    if (perturbationArray.length === 0) {
      return [
        <span
          className="flex flex-row h-full w-fit"
          style={{ color: baseTextColor }}
        >
          {'{ }'}
        </span>,
        <span
          className="flex flex-row h-full w-fit "
          style={{ color: baseTextColor }}
        >
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
              color: `${value ? 'var(--color-positive)' : 'var(--color-negative)'}`,
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
      <div
        className="flex flex-row h-full w-fit gap-1 "
        style={{ color: baseTextColor }}
      >
        {textPerturbation}
      </div>,
    ];
  }

  public formatPhenotype(
    phenotypeArray: Array<[string, Phenotype]>,
    baseTextColor: string
  ): [JSX.Element, JSX.Element] {
    if (phenotypeArray.length === 0) {
      return [
        <span
          className="flex flex-row h-full w-fit"
          style={{ color: baseTextColor }}
        >
          {'{ }'}
        </span>,
        <span
          className="flex flex-row h-full w-fit "
          style={{ color: baseTextColor }}
        >
          Empty Phenotype
        </span>,
      ];
    }

    const coloredPhenotype: Array<JSX.Element> = [];
    const textPhenotype: Array<JSX.Element> = [];

    phenotypeArray.forEach(([key, value], index) => {
      coloredPhenotype.push(
        <div key={key} className="flex flex-row h-full w-fit whitespace-nowrap">
          <span
            style={{
              color: `${value ? 'var(--color-positive)' : 'var(--color-negative)'}`,
            }}
          >
            {key}
          </span>
          {index < phenotypeArray.length - 1 && <span>,</span>}
        </div>
      );

      textPhenotype.push(
        <div key={key} className="flex flex-row h-full w-fit whitespace-nowrap">
          <span className="">{`${key}: ${value ? 'true' : 'false'}`}</span>
          {index < phenotypeArray.length - 1 && <span>,</span>}
        </div>
      );
    });

    return [
      <div className="flex flex-row h-full w-fit gap-1">
        {coloredPhenotype}
      </div>,
      <div
        className="flex flex-row h-full w-fit gap-1"
        style={{ color: baseTextColor }}
      >
        {textPhenotype}
      </div>,
    ];
  }

  // #endregion

  // #region --- Perturbations Filtering ---

  /** Filters perturbations by variables they contain and their perturbation status. */
  private filterOutPertByVariables(
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
  public filterPerturbation = (
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

  /** Filters perturbations by filter criteria form this.perturbationFilterSortStore.
   *  Returns tuple where on index 0 is the array of filtered perturbations
   *  and on index 1 is boolean indicating if there is next page === there are more perturbations that pass the filter
   */
  public filterPerturbations(
    perturbations: Array<ControlResult>
  ): [Array<ControlResult>, boolean] {
    const filterState = this.perturbationFilterSortStore.getState();
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
  private compareById = (
    pertA: ControlResult,
    pertB: ControlResult
  ): number => {
    return pertA.id - pertB.id;
  };

  /** Compares two perturbations by their size (number of variables in the perturbation).
   *  Used for sorting perturbations.
   */
  private compareBySize = (
    pertA: ControlResult,
    pertB: ControlResult
  ): number => {
    return (
      Object.keys(pertA.perturbation).length -
      Object.keys(pertB.perturbation).length
    );
  };

  /** Compares two perturbations by their number of interpretations. */
  private compareByInterpretations = (
    pertA: ControlResult,
    pertB: ControlResult
  ): number => {
    return pertA.color_count - pertB.color_count;
  };

  private comparePerturbations = (
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

  /** Sorts perturbations by primary and secondary sort criteria from this.perturbationFilterSortStore.
   *  Returns new array of sorted perturbations.
   */
  public sortPerturbations(
    perturbations: Array<ControlResult>
  ): Array<ControlResult> {
    const sortState = this.perturbationFilterSortStore.getState();
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

  // #region --- Clear ---

  public clear(): void {
    this.perturbationFilterSortStore.getState().clear();
  }

  // #endregion
}

export default ControlPerturbationsTable;
