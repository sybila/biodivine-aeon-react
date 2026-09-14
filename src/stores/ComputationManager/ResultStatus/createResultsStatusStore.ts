import { create } from 'zustand';
import type {
  AttractorResults,
  ComputationModes,
  ControlResults,
} from '../../../types/types';
import type { ZustandStore } from '../../ZustandStoreType';
import type { ResultsStatus } from './ResultStatus';

function createResultsStatusStore(): ZustandStore<ResultsStatus> {
  return create<ResultsStatus>()((set, get) => ({
    results: {
      'Attractor Analysis': undefined,
      Control: undefined,
    },
    lastAddedResults: undefined,
    selectedResults: undefined,

    setResults: (mode, results) => {
      if (results === undefined) {
        get().clearResult(mode);
        return;
      }

      set((state) => ({
        results: {
          ...state.results,
          [mode]: results,
        },
        lastAddedResults: { mode, timestamp: Date.now() },
      }));
    },

    setSelectedResults: (mode) => {
      if (mode !== undefined && get().results[mode] === undefined) {
        return;
      }

      set(() => ({
        selectedResults: mode,
      }));
    },

    isResultsConflict: (mode) => {
      if (get().results[mode] !== undefined) {
        return true;
      }

      return false;
    },

    getDefinedResults: () => {
      const definedResults: [
        ComputationModes,
        AttractorResults | ControlResults,
      ][] = [];
      const results = get().results;

      for (const mode of Object.keys(results) as ComputationModes[]) {
        const value = results[mode];
        if (value !== undefined) {
          definedResults.push([mode, value]);
        }
      }

      return definedResults;
    },

    clearResult: (mode) => {
      set((state) => {
        // Avoid unnecessary updates when there is nothing to clear.
        if (
          state.results[mode] === undefined &&
          state.lastAddedResults?.mode !== mode
        ) {
          return state;
        }

        let nextLastAddedResults = state.lastAddedResults;
        if (state.lastAddedResults?.mode === mode) {
          const fallbackMode = (
            Object.entries(state.results) as [
              ComputationModes,
              AttractorResults | ControlResults | undefined,
            ][]
          ).find(
            ([resultMode, value]) => resultMode !== mode && value !== undefined
          )?.[0];

          nextLastAddedResults = fallbackMode
            ? { mode: fallbackMode, timestamp: undefined }
            : undefined;
        }

        return {
          results: {
            ...state.results,
            [mode]: undefined,
          },
          lastAddedResults: nextLastAddedResults,
        };
      });
    },

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
