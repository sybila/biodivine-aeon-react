import type { ResultsStatus } from '../../../../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type ResultTabsProps = {
  deleteModeOn: boolean;
  setTabBarHelpHover: (event: MouseEvent, text: string) => void;
  openResultsWindow: () => void;
  closeResultsWindow: () => void;
  clearHelpHover: () => void;
  resultsStatusStore: ZustandStore<ResultsStatus>;
};
