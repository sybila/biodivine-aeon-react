import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Position } from '../../../../types';
import type { HelpHoverProps } from './HelpHoverProps';

const HelpHover: React.FC<HelpHoverProps> = ({ zIndex, helpHoverStore }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const helpHoverPosition: Position | null = helpHoverStore(
    (state) => state.position
  );
  const helpHoverText: string | null = helpHoverStore(
    (state) => state.helpText
  );
  const isTooltip: boolean = helpHoverStore((state) => state.isTooltip);

  const shouldRender = helpHoverPosition && helpHoverText;

  useEffect(() => {
    if (shouldRender) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [helpHoverPosition, helpHoverText]);

  if (!shouldRender) {
    return null;
  }

  const tooltipClasses =
    'h-[30px] text-[16px] px-3 py-2 bg-[var(--color-tooltip-bg)] text-[var(--lighter-text-color)]';

  const defaultClasses = 'h-[50px] text-[20px] p-5 bg-[var(--color-secondary)]';

  return createPortal(
    <div
      className={`absolute flex items-center justify-center shadow-lg transition-all duration-300 min-w-[100px] max-w-[80%] rounded-[24px] select-none pointer-events-none ${
        isTooltip ? tooltipClasses : defaultClasses
      }`}
      style={{
        top: helpHoverPosition[1],
        left: helpHoverPosition[0],
        transform: visible
          ? 'translate(-50%, -50%) scale(1)'
          : 'translate(-50%, -50%) scale(0.8)',
        zIndex: zIndex,
        boxShadow: '0px 2px 5px #d0d0d0',
        opacity: visible ? 1 : 0,
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
