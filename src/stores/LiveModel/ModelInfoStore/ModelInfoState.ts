/**
 * Zustand store for model meta-information (name and description).
 * Provides actions for getting and setting model name and description,
 * and triggers UI/model updates on change.
 */
export type ModelInfoState = {
  modelName: string;
  modelDescription: string;
  /** Get the current model name */
  getModelName: () => string;
  /** Set the model name and trigger UI update */
  setModelName: (name: string) => void;
  /** Get the current model description */
  getModelDescription: () => string;
  /** Set the model description and trigger UI update */
  setModelDescription: (description: string) => void;
  /** Clear model name and description */
  clear: () => void;
};
