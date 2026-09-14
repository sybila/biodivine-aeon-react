import type { ModelType } from '../../../../types/types';

/**
 * Interface or managing multiple models in the LiveModel.
 */
export interface ModelsLMInt {
  // #region --- Model Management ---

  /** Adds a new model into LiveModel and returns its ID.
   *  If the type is 'main', it will replace the existing main model (ID 0) and return ID 0.
   */
  addModel(modelAeonString: string, type: ModelType): number;

  /** Updates an existing model and returns true if successful. */
  updateModel(id: number, modelAeonString: string): boolean;

  /** Removes a model by its ID.
   *  If the ID is 0 (main model), it will not be removed.
   */
  removeModel(id: number): void;

  /** Function for switching between added models. */
  loadModel(id: number): boolean;

  // #endregion
}
