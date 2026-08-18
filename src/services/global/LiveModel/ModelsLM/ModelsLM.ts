import type { ModelState } from '../../../../stores/LiveModel/LoadedModelStore/ModelState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type { ModelSave, ModelType } from '../../../../types/types';
import type { LiveModelInt } from '../LiveModelInt';
import type { ModelsLMInt } from './ModelsLMInt';

/** Class for managing multiple models in the LiveModel. */
class ModelsLM implements ModelsLMInt {
  // #region --- Properties and Constructor ---

  /** Stores model saves by their IDs. The main model is always stored under ID 0. */
  private models: Record<number, ModelSave> = {
    0: { id: 0, type: 'main', modelAeonString: '' },
  };

  /** Id of the next added model. */
  private nextId: number = 1;

  private livemodel: LiveModelInt;

  private loadedModelStore: ZustandStore<ModelState>;

  constructor(
    livemodel: LiveModelInt,
    loadedModelStore: ZustandStore<ModelState>
  ) {
    this.livemodel = livemodel;
    this.loadedModelStore = loadedModelStore;
  }

  // #endregion

  // #region --- Model Management ---

  /** Adds a new model into LiveModel and returns its ID.
   *  If the type is 'main', it will replace the existing main model (ID 0) and return ID 0.
   */
  public addModel(modelAeonString: string, type: ModelType): number {
    const modelId = type === 'main' ? 0 : this.nextId;

    this.models[modelId] = {
      id: modelId,
      type: type,
      modelAeonString: modelAeonString,
    };

    if (type !== 'main') {
      this.nextId += 1;
    }

    return modelId;
  }

  /** Updates an existing model and returns true if successful. */
  public updateModel(id: number, modelAeonString: string): boolean {
    if (!this.models[id]) return false;

    this.models[id] = {
      ...this.models[id],
      modelAeonString: modelAeonString,
    };
    return true;
  }

  /** Removes a model by its ID.
   *  If the ID is 0 (main model), it will not be removed.
   */
  public removeModel(id: number): void {
    if (id === 0) return; // cannot remove main model

    if (this.loadedModelStore.getState().loadedModelId === id) {
      this.loadModel(0);
    }

    delete this.models[id];
  }

  /** Function for switching between added models. */
  public loadModel(id: number): boolean {
    const loadedModelId = this.loadedModelStore.getState().loadedModelId;
    if (loadedModelId === id) return true;

    if (loadedModelId === 0) {
      this.updateModel(0, this.livemodel.Export.exportAeon(true) ?? '');
    }

    const model = this.models[id];
    if (!model) return false;

    this.loadedModelStore.getState().setLoadedModel(id, model.type);
    this.livemodel.Import.importAeon(model.modelAeonString);
    return true;
  }

  // #endregion
}

export default ModelsLM;
