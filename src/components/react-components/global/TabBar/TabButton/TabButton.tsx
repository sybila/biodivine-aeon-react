import { useNavigate } from '@tanstack/react-router';
import type { TabInfo } from '../../../../../types';
import IconButtonReact from '../../../lit-wrappers/IconButtonReact';
import useTabsStore from '../../../../../stores/Navigation/useTabsStore';

// Todo add type
const TabButton: React.FC<TabInfo> = ({ id, path, active }) => {
  const navigate = useNavigate();

  const onClick = () => {
    if (active) {
      return;
    }

    useTabsStore.getState().setActiveTab(id);
    navigate({ to: `${path}` });
  };

  return (
    <IconButtonReact compHeight="80%" handleClick={onClick} isActive={active} />
  );
};

export default TabButton;
