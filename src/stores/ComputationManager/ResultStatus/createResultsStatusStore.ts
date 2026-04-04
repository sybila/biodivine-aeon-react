import { create } from 'zustand';
import type { ZustandStore } from '../../ZustandStoreType';
import type { ResultsStatus } from './ResultStatus';

function createResultsStatusStore(): ZustandStore<ResultsStatus> {
  return create<ResultsStatus>()((set, get) => ({
    results: {
      'Attractor Analysis': undefined,
      Control: undefined,
    },
    lastAddedResults: undefined,

    setResults: (mode, results) =>
      set((state) => ({
        results: {
          ...state.results,
          [mode]: results,
        },
        lastAddedResults:
          results !== undefined ? { mode, timestamp: Date.now() } : undefined,
      })),

    isResultsConflict: (mode) => {
      if (get().results[mode] !== undefined) {
        return true;
      }

      return false;
    },

    clearResult: (mode) =>
      set((state) => ({
        results: {
          ...state.results,
          [mode]: undefined,
        },
        lastAddedResults: undefined,
      })),

    clear: () =>
      set(() => ({
        results: {
          'Attractor Analysis': undefined,
          Control: undefined,
        },
        lastAddedResults: undefined,
      })),
  }));
}

export default createResultsStatusStore;
