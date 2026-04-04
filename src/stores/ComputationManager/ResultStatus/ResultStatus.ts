import type {
  AttractorResults,
  ComputationModes,
  ControlResults,
} from '../../../types';

/** Zustand store for managing computation results.
 * Provides actions to set and clear the results.
 */
export type ResultsStatus = {
  results: Record<
    ComputationModes,
    AttractorResults | ControlResults | undefined
  >;
  /** Contains the information about last results which were loaded into the results record.
   *  If there are results, it returns an object with the mode of the results and the timestamp when they were added.
   *  If there are no results, it returns undefined.
   */
  lastAddedResults: { mode: ComputationModes; timestamp: number } | undefined;
  /** Tests if there is a conflict in the results for the given computation mode.
   *  If there is possible conflict (there are results for that mode), it returns true, otherwise false.
   *  @param mode - The computation mode to check for results conflict.
   *  @param resultsStore - The Zustand store containing the results status.
   */
  isResultsConflict: (mode: ComputationModes) => boolean;
  setResults: (
    mode: ComputationModes,
    results: AttractorResults | ControlResults | undefined
  ) => void;
  clearResult: (mode: ComputationModes) => void;
  clear: () => void;
};
