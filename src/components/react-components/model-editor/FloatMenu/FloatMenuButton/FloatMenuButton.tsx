import type { FloatMenuButtonProps } from './FloatMenuButtonProps';

const FloatMenuButton: React.FC<FloatMenuButtonProps> = ({
  iconSrc,
  iconAlt,
  onClick,
  hintText,
  nextHintText,
  setHintText,
}) => {
  return (
    <button
      className="flex flex-row justify-center items-center h-[36px] w-[36px] rounded-[24px] hover:bg-[var(--color-grey-blue-light)] transition duration-[0.3s]"
      onClick={() => {
        onClick();
        if (nextHintText !== undefined) setHintText(nextHintText);
      }}
      onMouseEnter={() => setHintText(hintText)}
      onMouseLeave={() => setHintText('')}
    >
      <img className="h-[65%]" src={iconSrc} alt={iconAlt} />
    </button>
  );
};

export default FloatMenuButton;
