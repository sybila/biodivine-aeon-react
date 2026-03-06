import type { ModelType } from '../../../types';

/** Zustand store for loaded model information.
 *  Manages the ID and type of the currently loaded model in LiveModel.
 */
export type ModelState = {
  loadedModelId: number;
  loadedModelType: ModelType;
  setLoadedModel: (id: number, type: ModelType) => void;
  clear: () => void;
};
