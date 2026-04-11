export type TabButtonProps = {
  active: boolean;
  deleteMode: boolean;
  icon: string;
  iconAlt: string;
  setHelpHover: (event: MouseEvent) => void;
  clearHelpHover: () => void;
  handleClick: () => void;
};
