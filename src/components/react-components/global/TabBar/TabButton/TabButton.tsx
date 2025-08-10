import { Navigate } from '@tanstack/react-router';
import type { TabInfo } from '../../../../../types';
import IconButtonReact from '../../../lit-wrappers/IconButtonReact';
import useTabsStore from '../../../../../stores/Navigation/useTabsStore';

const TabButton: React.FC<TabInfo> = ({ id, type, path, active }) => {
  const onClick = () => {
    if (active) {
      return;
    }

    useTabsStore.getState().setActiveTab(id);
    Navigate({ to: `${path}` });
  };

  return (
    <IconButtonReact compHeight="80%" handleClick={onClick} isActive={active} />
  );
};

export default TabButton;
