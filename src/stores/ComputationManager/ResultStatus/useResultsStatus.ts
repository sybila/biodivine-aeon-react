import { create } from 'zustand';
import type { ResultsStatus } from './ResultStatus';

/** Zustand store for managing computation results.
 * Provides actions to set and clear the results.
 */
const useResultsStatus = create<ResultsStatus>()((set) => ({
  type: undefined,
  results: undefined,
  setType: (type) => set({ type }),
  setResults: (results) => set({ results }),
  clear: () => set({ type: undefined, results: undefined }),
}));

export default useResultsStatus;
