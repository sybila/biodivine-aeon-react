export type ArrowSelectButtonProps = {
  active: boolean;
  onClick: () => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  text: string;
};
