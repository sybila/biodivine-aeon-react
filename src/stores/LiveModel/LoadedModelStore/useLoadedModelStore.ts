import { create } from 'zustand';
import type { ModelType } from '../../../types';
import type { ModelState } from './ModelState';

/** Zustand store for loaded model information.
 *  Manages the ID and type of the currently loaded model in LiveModel.
 */
const useLoadedModelStore = create<ModelState>((set) => ({
  loadedModelId: 0,
  loadedModelType: 'main',

  /** Set the loaded model ID and type */
  setLoadedModel: (id: number, type: ModelType) => {
    set({ loadedModelId: id, loadedModelType: type });
  },

  /** Reset the loaded model state to the main model. */
  clear: () => set({ loadedModelId: 0, loadedModelType: 'main' }),
}));

export default useLoadedModelStore;
