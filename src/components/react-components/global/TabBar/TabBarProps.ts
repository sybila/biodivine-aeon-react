import type { TabOperationsInt } from '../../../../services/global/Navigation/TabOperationsInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { TabsState } from '../../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type TabBarProps = {
  setTabBarHelpHover: (event: MouseEvent, text: string) => void;

  tabOperationsServ: TabOperationsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
  tabsStore: ZustandStore<TabsState>;
};
