import type { TabInfo } from '../../../../../types';
import IconButtonReact from '../../../lit-wrappers/IconButtonReact';
import useTabsStore from '../../../../../stores/Navigation/useTabsStore';

const TabButton: React.FC<TabInfo & { deleteMode: boolean }> = ({
  id,
  active,
  deleteMode,
}) => {
  const handleClick = () => {
    if (deleteMode) {
      if (id != 0) {
        useTabsStore.getState().removeTab(id);
      }
      return;
    }

    if (active) {
      return;
    }

    useTabsStore.getState().setActiveTab(id);
  };

  return (
    <IconButtonReact
      compHeight="80%"
      handleClick={handleClick}
      isActive={active}
      buttonColor={deleteMode && id != 0 ? 'var(--color-red-light)' : undefined}
      buttonHoverColor={deleteMode && id != 0 ? 'var(--color-red)' : undefined}
      buttonActiveColor={
        deleteMode && id != 0 ? 'var(--color-darker-red)' : undefined
      }
    />
  );
};

export default TabButton;
