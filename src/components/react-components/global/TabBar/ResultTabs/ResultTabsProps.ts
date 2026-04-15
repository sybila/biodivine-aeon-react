import type { ResultsOperationsInt } from '../../../../../services/global/ResultsOperations/ResultsOperationsInt';
import type { ResultsStatus } from '../../../../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type ResultTabsProps = {
  deleteModeOn: boolean;
  setTabBarHelpHover: (event: MouseEvent, text: string) => void;
  openResultsWindow: () => void;
  closeResultsWindow: () => void;
  clearHelpHover: () => void;

  resultsOperationsServ: ResultsOperationsInt;
  warningServ: WarningInt;

  resultsStatusStore: ZustandStore<ResultsStatus>;
};
