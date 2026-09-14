import { create } from 'zustand';
import type { ZustandStore } from '../../ZustandStoreType';
import type { ModelInfoState } from './ModelInfoState';

function createModelInfoStore(): ZustandStore<ModelInfoState> {
  return create<ModelInfoState>((set, get) => ({
    modelName: '',
    modelDescription: '',

    getModelName: () => get().modelName,

    setModelName: (name: string) => {
      if (get().modelName !== name) {
        set({ modelName: name });
      }
    },

    getModelDescription: () => get().modelDescription,

    setModelDescription: (description: string) => {
      if (get().modelDescription !== description) {
        set({ modelDescription: description });
      }
    },

    clear: () => {
      set({ modelName: '', modelDescription: '' });
    },
  }));
}

export default createModelInfoStore;
