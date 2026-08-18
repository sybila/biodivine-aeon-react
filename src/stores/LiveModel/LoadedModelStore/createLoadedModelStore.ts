import { create } from 'zustand';
import type { ModelType } from '../../../types/types';
import type { ZustandStore } from '../../ZustandStoreType';
import type { ModelState } from './ModelState';

function createLoadedModelStore(): ZustandStore<ModelState> {
  return create<ModelState>((set) => ({
    loadedModelId: 0,
    loadedModelType: 'main',

    /** Set the loaded model ID and type */
    setLoadedModel: (id: number, type: ModelType) => {
      set({ loadedModelId: id, loadedModelType: type });
    },

    /** Reset the loaded model state to the main model. */
    clear: () => set({ loadedModelId: 0, loadedModelType: 'main' }),
  }));
}

export default createLoadedModelStore;
