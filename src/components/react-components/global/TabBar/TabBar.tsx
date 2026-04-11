import { useMemo, useState } from 'react';
import IconButtonReact from '../../lit-wrappers/IconButtonReact';

import DeleteIcon from '../../../../assets/icons/delete-24px.svg';
import type { TabType } from '../../../../types';
import DynamicTabs from './DynamicTabs/DynamicTabs';
import type { TabBarProps } from './TabBarProps';

const TabBar: React.FC<TabBarProps> = ({
  setTabBarHelpHover,
  tabOperationsServ,

  helpHoverStore,
  tabsStore,
  resultsStatusStore,
}) => {
  const [deleteModeOn, setDeleteModeOn] = useState(false);

  const tabs = tabsStore((state) => state.openedTabs);
  const results = resultsStatusStore((state) => state.results);
  const selectedResults = resultsStatusStore((state) => state.lastAddedResults);

  const tabsArray = useMemo(() => Object.values(tabs), [tabs]);
  const resultsArray = useMemo(() => Object.values(results), [results]);

  return (
    <div className="flex flex-row h-full w-fit gap-3 justify-start items-center">
      <section className="flex flex-row h-full w-fit gap-2 justify-center items-center">
        <IconButtonReact
          compHeight="80%"
          iconSrc={DeleteIcon}
          iconAlt="Delete"
          isActive={deleteModeOn}
          buttonColor={deleteModeOn ? 'var(--color-red-light)' : undefined}
          buttonHoverColor={deleteModeOn ? 'var(--color-red)' : undefined}
          buttonActiveColor={
            deleteModeOn ? 'var(--color-darker-red)' : undefined
          }
          onClick={() => setDeleteModeOn(!deleteModeOn)}
          onMouseOver={(e) =>
            setTabBarHelpHover(e.nativeEvent, 'Delete Tab Mode')
          }
          onMouseLeave={() => helpHoverStore.getState().clear()}
        />
      </section>

      <div className="h-[90%] w-1 bg-black" />

      <DynamicTabs<TabType, number>
        tabs={tabsArray}
        deleteModeOn={(tabId) => deleteModeOn && tabId !== 0}
        getIcon={(tabType) => tabOperationsServ.getTabTypeIcon(tabType)}
        setTabBarHelpHover={setTabBarHelpHover}
        clearHelpHover={() => helpHoverStore.getState().clear()}
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
    </div>
  );
};

export default TabBar;
