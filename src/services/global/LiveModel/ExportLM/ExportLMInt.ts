import type { fileType, ModelStats } from '../../../../types';

/**
 * Interface to allow export of currently loaded model.
 */
export interface ExportLMInt {
  // #region --- Model Stats ---

  /** Export stats object */
  stats(): ModelStats;

  // #endregion

  // #region --- Export/Save Model ---

  /**
   * Export current model in Aeon text format, or undefined if model cannot be
   * exported (no variables).
   */
  exportAeon(emptyPossible?: boolean): string | undefined;

  /**
   * Save the current state of the model to local storage and ModelsLM live model module.
   * NOTE: This only triggers on structure change, not metadata changes.
   */
  saveModel(): void;

  // #endregion

  // #region --- Export to File ---

  /** Export current model to a file with the given file ending */
  exportToFile(
    fileEnding: fileType,
    conversionFunction?: (aeonString: string) => Promise<string>
  ): Promise<void>;

  // #endregion
}
