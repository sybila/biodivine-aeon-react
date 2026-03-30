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
