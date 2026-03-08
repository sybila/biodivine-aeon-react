import type { TabOperationsInt } from '../../../../../services/global/Navigation/TabOperationsInt';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { TabsState } from '../../../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';
import type { TabInfo } from '../../../../../types';

export type TabButtonProps = TabInfo & {
  deleteMode: boolean;
  setHelpHover: (event: MouseEvent, text: string) => void;

  tabOperationsServ: TabOperationsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
  tabsStore: ZustandStore<TabsState>;
};
