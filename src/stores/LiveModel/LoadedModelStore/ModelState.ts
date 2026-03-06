import type { ModelType } from '../../../types';

export type ModelState = {
  loadedModelId: number;
  loadedModelType: ModelType;
  setLoadedModel: (id: number, type: ModelType) => void;
  clear: () => void;
};
