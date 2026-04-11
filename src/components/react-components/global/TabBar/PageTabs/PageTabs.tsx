import { useMemo } from 'react';
import type { TabType } from '../../../../../types';
import DynamicTabs from '../DynamicTabs/DynamicTabs';
import type { PageTabsProps } from './PageTabsProps';

const PageTabs: React.FC<PageTabsProps> = ({
  deleteModeOn,
  setTabBarHelpHover,
  clearHelpHover,

  tabOperationsServ,

  tabsStore,
}) => {
  const tabs = tabsStore((state) => state.openedTabs);

  const tabsArray = useMemo(() => Object.values(tabs), [tabs]);

  return (
    <DynamicTabs<TabType, number>
      tabs={tabsArray}
      deleteModeOn={(tabId) => deleteModeOn && tabId !== 0}
      getIcon={(tabType) => tabOperationsServ.getTabTypeIcon(tabType)}
      setTabBarHelpHover={setTabBarHelpHover}
      clearHelpHover={clearHelpHover}
      handleTabClick={(tabId, active) => {
        if (deleteModeOn) {
          if (tabId != 0) {
            tabsStore.getState().removeTab(tabId);
          }
        } else if (!active) {
          tabsStore.getState().setActiveTab(tabId);
        }
      }}
    />
  );
};

export default PageTabs;
