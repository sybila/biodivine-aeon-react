import type { ComputationModes, ControlResult } from '../../../types';

/** Interface for performing operations on results. (eg. exporting to CSV) */
export interface ResultsOperationsInt {
  /** Export control perturbations as a CSV file and trigger a download.
   *  @param controlPerturbations - Array of control perturbations to be exported.
   *  @param fileName - The name of the file to be downloaded (without .csv extension).
   *  This function converts the control perturbations to a CSV string and uses the FileHelpers utility to download it as a .csv file.
   */
  exportControlPerturbationsAsCsv(
    controlPerturbations: Array<ControlResult>,
    fileName: string
  ): Promise<void>;

  /** Get the icon for a result tab based on its type.
   *  @param resultType (ComputationModes | null) - The type of the result.
   *  @returns The icon name for the result tab. If resultType is null or doesn't match any known types, returns a default results icon.
   */
  getResultTabIcon(resultType: ComputationModes | null): string;
}
