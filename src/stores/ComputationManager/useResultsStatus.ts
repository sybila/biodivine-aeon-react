import { create } from 'zustand';
import type {
  AttractorResults,
  ComputationModes,
  ControlResults,
} from '../../types';

type ResultsState = {
  /** Type of currently active results */
  type: ComputationModes | undefined;
  /** Currently active results */
  results: AttractorResults | ControlResults | undefined;
  setType(type: ComputationModes | undefined): void;
  setResults: (results: AttractorResults | ControlResults | undefined) => void;
  clear: () => void;
};

/** Zustand store for managing computation results.
 * Provides actions to set and clear the results.
 */

const useResultsStatus = create<ResultsState>()((set) => ({
  type: undefined,
  results: undefined,
  setType: (type) => set({ type }),
  setResults: (results) => set({ results }),
  clear: () => set({ type: undefined, results: undefined }),
}));

export default useResultsStatus;
