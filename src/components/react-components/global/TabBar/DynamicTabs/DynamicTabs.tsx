import type { PossibleTabIds, PossibleTabsTypes } from '../../../../../types';
import type { DynamicTabsProps } from './DynamicTabsProps';
import TabButton from './TabButton/TabButton';

const DynamicTabs = <T extends PossibleTabsTypes, R extends PossibleTabIds>({
  tabs,
  deleteModeOn,
  getIcon,
  setTabBarHelpHover,
  clearHelpHover,
  handleTabClick,
}: DynamicTabsProps<T, R>) => {
  return (
    <div className="h-full min-w-fit max-w-[500px] overflow-x-auto flex items-center justify-start gap-2 px-2">
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          active={tab.active}
          deleteMode={deleteModeOn(tab.id)}
          icon={getIcon(tab.type)}
          iconAlt={tab.type}
          setHelpHover={(event) => setTabBarHelpHover(event, tab.text)}
          clearHelpHover={() => clearHelpHover()}
          handleClick={() => handleTabClick(tab.id, tab.active)}
        />
      ))}
    </div>
  );
};

export default DynamicTabs;
