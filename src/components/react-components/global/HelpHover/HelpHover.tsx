import { createPortal } from 'react-dom';
import type { HelpHoverProps } from './HelpHoverProps';

const HelpHover: React.FC<HelpHoverProps> = ({ zIndex, helpHoverStore }) => {
  const helpHoverPosition = helpHoverStore((state) => state.position);
  const helpHoverText = helpHoverStore((state) => state.helpText);

  if (!helpHoverPosition || !helpHoverText) {
    return null;
  }

  return createPortal(
    <div
      className="h-[50px] min-w-[100px] max-w-[20%] text-[20px] rounded-[24px] bg-[var(--color-secondary)] p-5 absolute flex items-center justify-center shadow-lg transition-all duration-200 ease-in-out"
      style={{
        top: helpHoverPosition.y,
        left: helpHoverPosition.x,
        transform: 'translate(-50%, -50%)',
        zIndex: zIndex,
        boxShadow: '0px 2px 5px #d0d0d0',
      }}
    >
      <span
        className="whitespace-nowrap overflow-hidden text-ellipsis w-full text-center font-[var(--base-font-family)]"
        style={{ fontWeight: 'bold' }}
      >
        {helpHoverText}
      </span>
    </div>,
    document.body
  );
};

export default HelpHover;
