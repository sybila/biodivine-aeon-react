import type {
  AttractorResults,
  ComputationModes,
  ControlResults,
} from '../../../types';

/** Zustand store for managing computation results.
 * Provides actions to set and clear the results.
 */
export type ResultsStatus = {
  /** Type of currently active results */
  type: ComputationModes | undefined;
  /** Currently active results */
  results: AttractorResults | ControlResults | undefined;
  setType(type: ComputationModes | undefined): void;
  setResults: (results: AttractorResults | ControlResults | undefined) => void;
  clear: () => void;
};
