import type {
  PossibleTabIds,
  PossibleTabsTypes,
  TabInfo,
} from '../../../../../types/types';

export type DynamicTabsProps<
  T extends PossibleTabsTypes,
  R extends PossibleTabIds,
> = {
  tabs: TabInfo<T, R>[];
  deleteModeOn: (tabId?: R) => boolean;
  getIcon: (type: T) => string;
  setTabBarHelpHover: (event: MouseEvent, text: string) => void;
  clearHelpHover: () => void;
  handleTabClick: (tabId: R, active: boolean) => void;
};
