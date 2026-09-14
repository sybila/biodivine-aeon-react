import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import type { ArrowSelectButtonProps } from './ArrowSelectButtonProps';

import LeftArrow from '../../../../assets/icons/arrow-left.svg';
import RightArrow from '../../../../assets/icons/arrow-right.svg';

const ArrowSelectButton: React.FC<ArrowSelectButtonProps> = ({
  active,
  onClick,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  buttonColor,
  buttonHoverColor,
  buttonActiveColor,
  textColor,
  text,
}) => {
  return (
    <div className="flex justify-center items-center h-[30px] w-full">
      {active ? (
        <img
          className="flex justify-center items-center h-[20px] w-[20px]"
          src={LeftArrow}
          alt="Left Arrow"
        />
      ) : null}
      <TextButtonReact
        compHeight="100%"
        compWidth="70%"
        buttonColor={buttonColor}
        buttonHoverColor={buttonHoverColor}
        buttonActiveColor={buttonActiveColor}
        textColor={textColor}
        text={text}
        handleClick={onClick}
        active={active}
        onMouseEnter={(e: React.MouseEvent) => onMouseEnter(e)}
        onMouseLeave={(e: React.MouseEvent) => onMouseLeave(e)}
      />
      {active ? (
        <img
          className="h-[20px] justify-center items-center w-[20px]"
          src={RightArrow}
          alt="Right Arrow"
        />
      ) : null}
    </div>
  );
};

export default ArrowSelectButton;
