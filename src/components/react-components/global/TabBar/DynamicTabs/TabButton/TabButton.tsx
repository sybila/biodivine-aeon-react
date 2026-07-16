import IconButtonReact from '../../../../lit-wrappers/IconButtonReact';
import type { TabButtonProps } from './TabButtonProps';

const TabButton: React.FC<TabButtonProps> = ({
  active,
  deleteMode,
  icon,
  iconAlt,
  setHelpHover,
  clearHelpHover,
  handleClick,
}) => {
  return (
    <IconButtonReact
      compHeight="80%"
      handleClick={handleClick}
      isActive={active}
      buttonColor={
        deleteMode ? 'var(--color-delete)' : 'var(--color-secondary-buttons)'
      }
      buttonHoverColor={
        deleteMode
          ? 'var(--color-delete-hover)'
          : 'var(--color-secondary-buttons-hover)'
      }
      buttonActiveColor={
        deleteMode
          ? 'var(--color-delete-active)'
          : 'var(--color-secondary-buttons-active)'
      }
      iconSrc={icon}
      iconAlt={iconAlt}
      iconSize="67%"
      onMouseOver={(e) => setHelpHover(e.nativeEvent)}
      onMouseLeave={() => clearHelpHover()}
    />
  );
};

export default TabButton;
