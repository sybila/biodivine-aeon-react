import type { TabOperationsInt } from '../../../../../services/global/Navigation/TabOperationsInt';
import type { TabsState } from '../../../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type PageTabsProps = {
  deleteModeOn: boolean;
  setTabBarHelpHover: (event: MouseEvent, text: string) => void;
  clearHelpHover: () => void;

  tabOperationsServ: TabOperationsInt;

  tabsStore: ZustandStore<TabsState>;
};
