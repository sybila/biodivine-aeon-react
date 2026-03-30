import { create } from 'zustand';
import type { ZustandStore } from '../../ZustandStoreType';
import type { ResultsStatus } from './ResultStatus';

function createResultsStatusStore(): ZustandStore<ResultsStatus> {
  return create<ResultsStatus>()((set, get) => ({
    results: {
      'Attractor Analysis': undefined,
      Control: undefined,
    },
    setResults: (mode, results) =>
      set((state) => ({
        results: {
          ...state.results,
          [mode]: results,
        },
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
      })),

    clear: () =>
      set(() => ({
        results: {
          'Attractor Analysis': undefined,
          Control: undefined,
        },
      })),
  }));
}

export default createResultsStatusStore;
