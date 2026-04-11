import type { PossibleTabsTypes, TabInfo } from '../../../../../types';

export type DynamicTabsProps<T extends PossibleTabsTypes> = {
  tabs: TabInfo<T>[];
  deleteModeOn: (tabId?: number) => boolean;
  getIcon: (type: T) => string;
  setTabBarHelpHover: (event: MouseEvent, text: string) => void;
  clearHelpHover: () => void;
  handleTabClick: (tabId: number, active: boolean) => void;
};
