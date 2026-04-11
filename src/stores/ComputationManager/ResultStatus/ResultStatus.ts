import type {
  ComputationModes,
  Results,
  TimestampedResultsMode,
} from '../../../types';

/** Zustand store for managing computation results.
 * Provides actions to set and clear the results.
 */
export type ResultsStatus = {
  results: Record<ComputationModes, Results | undefined>;
  /** Contains the information about last results which were loaded into the results record.
   *  If there are results, it returns an object with the mode of the results and the timestamp when they were added.
   *  If lastAddedResults were deleted, it is set to another computation results (in this case timestamp is set to undefined) or to undefined if there are no more results.
   *  If there are no results, it returns undefined.
   */
  lastAddedResults: TimestampedResultsMode | undefined;
  /** Contains last result type selected in the results menu. */
  selectedResults: ComputationModes | undefined;
  /** Tests if there is a conflict in the results for the given computation mode.
   *  If there is possible conflict (there are results for that mode), it returns true, otherwise false.
   *  @param mode - The computation mode to check for results conflict.
   *  @param resultsStore - The Zustand store containing the results status.
   */
  isResultsConflict: (mode: ComputationModes) => boolean;
  setSelectedResults: (mode: ComputationModes | undefined) => void;
  setResults: (mode: ComputationModes, results: Results | undefined) => void;
  /** Returns list of currently defined results.
   *  Each item in the list is a tuple containing the computation mode and the corresponding results.
   *  If there are no results, it returns an empty list.
   */
  getDefinedResults: () => [ComputationModes, Results][];
  clearResult: (mode: ComputationModes) => void;
  clear: () => void;
};
