/**
 * Interface to allow import of models into the live model.
 */
export interface ImportLMInt {
  // #region --- Import Aeon ---

  /** Import a model from an Aeon file with warnings.
   *  If there are results loaded or tabs open, warn the user that they will be lost.
   *  If the model is not empty, warn the user that it will be erased.
   */
  importAeonWithWarnings(modelString: string): Promise<boolean>;

  /**
   * Import model from Aeon file, load it into the live model and save it as the main model.
   * If the import is successful, return true.
   */
  importAeon(modelString: string): boolean;

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
