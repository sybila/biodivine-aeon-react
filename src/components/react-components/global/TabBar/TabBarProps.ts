import type { TabOperationsInt } from '../../../../services/global/Navigation/TabOperationsInt';
import type { ResultsOperationsInt } from '../../../../services/global/ResultsOperations/ResultsOperationsInt';
import type { WarningInt } from '../../../../services/global/Warning/WarningInt';
import type { ResultsStatus } from '../../../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { TabsState } from '../../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type { OverlayWindowTypeME } from '../../layouts/BaseLayout/BaseLayout';

export type TabBarProps = {
  setTabBarHelpHover: (event: MouseEvent, text: string) => void;
  setActiveWindow: (windowName: OverlayWindowTypeME) => void;

  tabOperationsServ: TabOperationsInt;
  resultsOperationsServ: ResultsOperationsInt;
  warningServ: WarningInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
  tabsStore: ZustandStore<TabsState>;
  resultsStatusStore: ZustandStore<ResultsStatus>;
};
