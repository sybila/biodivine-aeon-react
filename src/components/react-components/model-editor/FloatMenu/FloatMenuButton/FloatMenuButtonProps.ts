export type FloatMenuButtonProps = {
  iconSrc: string;
  iconAlt: string;
  onClick: () => void;
  hintText: string;
  nextHintText?: string;
  setHintText: (text: string) => void;
};
