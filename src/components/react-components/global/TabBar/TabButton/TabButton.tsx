import IconButtonReact from '../../../lit-wrappers/IconButtonReact';
import type { TabButtonProps } from './TabButtonProps';

const TabButton: React.FC<TabButtonProps> = ({
  id,
  type,
  active,
  deleteMode,
  setHelpHover,
  tabOperationsServ,
  helpHoverStore,
  tabsStore,
}) => {
  const handleClick = () => {
    if (deleteMode) {
      if (id != 0) {
        tabsStore.getState().removeTab(id);
      }
      return;
    }

    if (active) {
      return;
    }

    tabsStore.getState().setActiveTab(id);
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
      iconSrc={tabOperationsServ.getTabTypeIcon(type)}
      iconAlt={type}
      iconSize="67%"
      onMouseOver={(e) => setHelpHover(e.nativeEvent, type)}
      onMouseLeave={(e) => helpHoverStore.getState().clear()}
    />
  );
};

export default TabButton;
