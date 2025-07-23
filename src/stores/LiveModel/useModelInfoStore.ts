import { create } from 'zustand';

/**
 * Zustand store for model meta-information (name and description).
 * Provides actions for getting and setting model name and description,
 * and triggers UI/model updates on change.
 */
type InfoState = {
  modelName: string;
  modelDescription: string;
  getModelName: () => string;
  setModelName: (name: string) => void;
  getModelDescription: () => string;
  setModelDescription: (description: string) => void;
  clear: () => void;
};

const useModelInfoStore = create<InfoState>((set, get) => ({
  modelName: '',
  modelDescription: '',

  /** Get the current model name */
  getModelName: () => get().modelName,

  /** Set the model name and trigger UI update */
  setModelName: (name: string) => {
    if (get().modelName !== name) {
      set({ modelName: name });
    }
  },

  /** Get the current model description */
  getModelDescription: () => get().modelDescription,

  /** Set the model description and trigger UI update */
  setModelDescription: (description: string) => {
    if (get().modelDescription !== description) {
      set({ modelDescription: description });
    }
  },

  /** Clear model name and description */
  clear: () => {
    set({ modelName: '', modelDescription: '' });
  },
}));

export default useModelInfoStore;
