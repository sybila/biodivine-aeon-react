import { useState } from 'react';
import IconButtonReact from '../../lit-wrappers/IconButtonReact';

import DeleteIcon from '../../../../assets/icons/delete-24px.svg';
import PageTabs from './PageTabs/PageTabs';
import ResultTabs from './ResultTabs/ResultTabs';
import type { TabBarProps } from './TabBarProps';

const TabBar: React.FC<TabBarProps> = ({
  setTabBarHelpHover,
  setActiveWindow,
  tabOperationsServ,
  resultsOperationsServ,
  warningServ,

  helpHoverStore,
  tabsStore,
  resultsStatusStore,
}) => {
  const [deleteModeOn, setDeleteModeOn] = useState(false);

  return (
    <div className="flex flex-row h-full w-fit gap-3 justify-start items-center">
      <section className="flex flex-row h-full w-fit gap-2 justify-center items-center">
        <IconButtonReact
          compHeight="80%"
          iconSrc={DeleteIcon}
          iconAlt="Delete"
          isActive={deleteModeOn}
          buttonColor={
            deleteModeOn
              ? 'var(--color-delete)'
              : 'var(--color-secondary-buttons)'
          }
          buttonHoverColor={
            deleteModeOn
              ? 'var(--color-delete-hover)'
              : 'var(--color-secondary-buttons-hover)'
          }
          buttonActiveColor={
            deleteModeOn ? 'var(--color-delete-active)' : 'var(--color-secondary-buttons-active)'
          }
          onClick={() => setDeleteModeOn(!deleteModeOn)}
          onMouseOver={(e) =>
            setTabBarHelpHover(e.nativeEvent, 'Delete Tab Mode')
          }
          onMouseLeave={() => helpHoverStore.getState().clear()}
        />
      </section>

      <div className="h-[90%] w-1 bg-(--color-primary-separator-dark)" />

      <ResultTabs
        deleteModeOn={deleteModeOn}
        setTabBarHelpHover={setTabBarHelpHover}
        openResultsWindow={() => setActiveWindow('Results')}
        closeResultsWindow={() => setActiveWindow(null)}
        clearHelpHover={() => helpHoverStore.getState().clear()}
        resultsOperationsServ={resultsOperationsServ}
        warningServ={warningServ}
        resultsStatusStore={resultsStatusStore}
      />

      <div className="h-[90%] w-1 bg-(--color-primary-separator-dark)" />

      <PageTabs
        deleteModeOn={deleteModeOn}
        setTabBarHelpHover={setTabBarHelpHover}
        clearHelpHover={() => helpHoverStore.getState().clear()}
        tabOperationsServ={tabOperationsServ}
        tabsStore={tabsStore}
      />
    </div>
  );
};

export default TabBar;
