import { create } from 'zustand';
import type { ZustandStore } from '../../ZustandStoreType';
import type { ResultsStatus } from './ResultStatus';

function createResultsStatusStore(): ZustandStore<ResultsStatus> {
  return create<ResultsStatus>()((set) => ({
    type: undefined,
    results: undefined,
    setType: (type) => set({ type }),
    setResults: (results) => set({ results }),
    clear: () => set({ type: undefined, results: undefined }),
  }));
}

export default createResultsStatusStore;
