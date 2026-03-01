import type { ControlResult } from '../../../types';
import DataFormaters from '../../utilities/DataFormaters/DataFormaters';
import FileHelpers from '../../utilities/FileHelpers';
import type { ResultsOperationsInt } from './ResultsOperationsInt';

/** Class for performing operations on results. (eg. exporting to CSV) */
class ResultsOperationsClass implements ResultsOperationsInt {
  /** Export control perturbations as a CSV file and trigger a download.
   *  @param controlPerturbations - Array of control perturbations to be exported.
   *  @param fileName - The name of the file to be downloaded (without .csv extension).
   *  This function converts the control perturbations to a CSV string and uses the FileHelpers utility to download it as a .csv file.
   */
  public async exportControlPerturbationsAsCsv(
    controlPerturbations: Array<ControlResult>,
    fileName: string
  ): Promise<void> {
    const fileContent =
      DataFormaters.convertPerturbationsToCsvString(controlPerturbations);
    FileHelpers.downloadFile(fileName + '.csv', fileContent);
  }
}

const ResultsOperations = new ResultsOperationsClass();

export default ResultsOperations;
