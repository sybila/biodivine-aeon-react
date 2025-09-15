import { useNavigate } from '@tanstack/react-router';
import type { TabInfo } from '../../../../../types';
import IconButtonReact from '../../../lit-wrappers/IconButtonReact';
import useTabsStore from '../../../../../stores/Navigation/useTabsStore';

// Todo add type
const TabButton: React.FC<TabInfo> = ({ id, path, onClick, active }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (active) {
      return;
    }

    useTabsStore.getState().setActiveTab(id);
    navigate({ to: `${path}` });

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
