import type { fileType, ModelStats, Position } from '../../../../types/types';

/**
 * Interface to allow export of currently loaded model.
 */
export interface ExportLMInt {
  // #region --- Model Stats ---

  /** Export stats object */
  stats(): ModelStats;

  // #endregion

  // #region --- Setters ---

  /** Sets the function that is used to retrieve node positions from ModelVisualization */
  setGetNodePositionFunction(
    func: (variableId: number) => Position | undefined
  ): void;

  // #endregion

  // #region --- Export/Save Model ---

  /**
   * Exports the current model into string in aeon format.
   * This includes model metadata, variable definitions with control states and regulations,
   * and phenotype associations.
   *
   * @param emptyPossible - Determines whether to allow exporting if no variables exist.
   *                       If set to `true`, returns the export string even if the variable store is empty.
   *                       If set to `false` (default), returns `undefined` when there are no variables.
   * @param defaultPhenotypeId - The ID of the reference phenotype used to determine control states for variables.
   * @returns (string | undefined) A concatenated string containing model as string,
   *                               or `undefined` if `emptyPossible` is false and no variables are present.
   */
  exportAeon(
    emptyPossible?: boolean,
    defaultPhenotypeId?: number
  ): string | undefined;

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
