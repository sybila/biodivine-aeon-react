import IconButtonReact from '../../../lit-wrappers/IconButtonReact';
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
      buttonColor={deleteMode ? 'var(--color-red-light)' : undefined}
      buttonHoverColor={deleteMode ? 'var(--color-red)' : undefined}
      buttonActiveColor={deleteMode ? 'var(--color-darker-red)' : undefined}
      iconSrc={icon}
      iconAlt={iconAlt}
      iconSize="67%"
      onMouseOver={(e) => setHelpHover(e.nativeEvent)}
      onMouseLeave={() => clearHelpHover()}
    />
  );
};

export default TabButton;
