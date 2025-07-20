import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import type { ComputationModeButtonProps } from './ComputationModeButtonProps';

import RightArrow from '../../../../assets/icons/arrow-right.svg';
import LeftArrow from '../../../../assets/icons/arrow-left.svg';

const ComputationModeButton: React.FC<ComputationModeButtonProps> = ({
  active,
  onClick,
  text,
}) => {
  return (
    <div className="flex justify-center items-center h-[30px] w-full">
      {active ? <img className='flex justify-center items-center h-[20px] w-[20px]' src={LeftArrow} alt="Left Arrow" /> : null}
      <TextButtonReact
        compHeight="100%"
        compWidth="70%"
        text={text}
        handleClick={onClick}
        active={active}
      />
      {active ? <img className='h-[20px] justify-center items-center w-[20px]' src={RightArrow} alt="Right Arrow" /> : null}
    </div>
  );
};

export default ComputationModeButton;
