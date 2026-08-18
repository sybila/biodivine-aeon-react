import type { Result } from '../../../../types/types';

/**
 * Interface to allow import of models into the live model.
 */
export interface ImportLMInt {
  // #region --- Import Callbacks ---

  /** Adds callback which runs after import is complete */
  addOnImportCallback(callback: () => void): void;

  // #endregion

  // #region --- Import Aeon ---

  /** Import a model from an Aeon file with warnings.
   *  If there are results loaded or tabs open, warn the user that they will be lost.
   *  If the model is not empty, warn the user that it will be erased.
   */
  importAeonWithWarnings(modelString: string): Promise<Result<boolean>>;

  /**
   * Imports a model from an Aeon file, loads it into the live model, and saves it as the main model.
   * If the import is successful, returns `true`.
   *
   * @param modelString - The string representation of the Aeon model to be imported.
   * @returns A `Result<boolean>` object indicating the success of the import operation.
   */
  importAeon(modelString: string): Result<boolean>;

  // #endregion

  // #region --- Import from file ---

  importFromFile(
    element: HTMLInputElement & { files: FileList },
    formatToAeonFunction?: (file: string) => Promise<string> | null
  ): void;

  // #endregion

  // #region --- Import from local storage ---

  /** Loads model saved in the local storage of the browser. */
  loadFromLocalStorage(): Promise<void>;

  // #endregion
}
