import type { ComputationModes, ControlResult } from '../../../types/types';
import type { DataFormatersInt } from '../../utilities/DataFormaters/DataFormatersInt';
import type { FileHelpersInt } from '../../utilities/FileHelpers/FileHelpersInt';
import type { ResultsOperationsInt } from './ResultsOperationsInt';

import AttractorResultsIcon from '../../../assets/icons/attractor-results.svg';
import DefaultResultIcon from '../../../assets/icons/call_split-48px.svg';
import ControlResultsIcon from '../../../assets/icons/control-results.svg';

/** Class for performing operations on results. (eg. exporting to CSV) */
class ResultsOperations implements ResultsOperationsInt {
  // #region --- Properties + Constructor ---

  private dataFormatersServ: DataFormatersInt;
  private fileHelpersServ: FileHelpersInt;

  constructor(
    dataFormatersServ: DataFormatersInt,
    fileHelpersServ: FileHelpersInt
  ) {
    this.dataFormatersServ = dataFormatersServ;
    this.fileHelpersServ = fileHelpersServ;
  }

  // #endregion

  public async exportControlPerturbationsAsCsv(
    controlPerturbations: Array<ControlResult>,
    fileName: string
  ): Promise<void> {
    const fileContent =
      this.dataFormatersServ.convertPerturbationsToCsvString(
        controlPerturbations
      );
    this.fileHelpersServ.downloadFile(fileName + '.csv', fileContent);
  }

  public getResultTabIcon(resultType: ComputationModes | null) {
    switch (resultType) {
      case 'Attractor Analysis':
        return AttractorResultsIcon;
      case 'Control':
        return ControlResultsIcon;
      default:
        return DefaultResultIcon;
    }
  }
}

export default ResultsOperations;
