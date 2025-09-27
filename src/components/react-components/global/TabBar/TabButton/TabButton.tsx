import type { TabInfo } from '../../../../../types';
import IconButtonReact from '../../../lit-wrappers/IconButtonReact';
import useTabsStore from '../../../../../stores/Navigation/useTabsStore';

// Todo add type
const TabButton: React.FC<TabInfo> = ({ id, onClick, active }) => {
  const handleClick = () => {
    if (active) {
      return;
    }

    useTabsStore.getState().setActiveTab(id);

    if (onClick) {
      onClick();
    }
  };

  return (
    <IconButtonReact
      compHeight="80%"
      handleClick={handleClick}
      isActive={active}
    />
  );
};

export default TabButton;
