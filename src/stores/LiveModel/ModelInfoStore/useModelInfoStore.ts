import { create } from 'zustand';
import type { ModelInfoState } from './ModelInfoState';

/**
 * Zustand store for model meta-information (name and description).
 * Provides actions for getting and setting model name and description,
 * and triggers UI/model updates on change.
 */
const useModelInfoStore = create<ModelInfoState>((set, get) => ({
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

export default useModelInfoStore;
