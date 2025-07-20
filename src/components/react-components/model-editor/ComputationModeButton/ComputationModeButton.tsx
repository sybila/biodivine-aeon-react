import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import type { ComputationModeButtonProps } from './ComputationModeButtonProps';

const ComputationModeButton: React.FC<ComputationModeButtonProps> = ({
  active,
  onClick,
  text,
}) => {
  return (
    <div className="flex justify-center items-center h-[30px] w-full">
      {active ? <img className='flex justify-center items-center h-[20px] w-[20px] bg-red-500' /> : null}
      <TextButtonReact
        compHeight="100%"
        compWidth="70%"
        text={text}
        handleClick={onClick}
        active={active}
      />
      {active ? <img className='h-[20px] justify-center items-center w-[20px] bg-red-500' /> : null}
    </div>
  );
};

export default ComputationModeButton;
