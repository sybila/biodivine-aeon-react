import useTabsStore from '../../../../stores/Navigation/useTabsStore';
import TabButton from './TabButton/TabButton';

const TabBar: React.FC = () => {
  const tabs = useTabsStore((state) => state.openedTabs);

  return (
    <div className="h-full min-w-[100px] max-w-[500px] overflow-x-auto flex items-center justify-start gap-2 px-2">
      {Object.values(tabs).map((tab) => (
        <TabButton key={tab.id} {...tab} />
      ))}
    </div>
  );
};

export default TabBar;
