import { useEffect, useRef } from 'react';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import type { LoggerProps } from './LoggerProps';

/** Removes ANSI color/formatting codes that terminal loggers often emit. */
const ANSI_REGEX = /\x1b\[[0-9;]*[A-Za-z]/g;

/** Distance from the bottom (px) within which the view keeps following new output. */
const STICK_THRESHOLD = 24;

/** Terminal-like view that follows new lines. */
const Logger: React.FC<LoggerProps> = ({
  lines,
  onClear,
  tooltips,
  otherStrings,
  helpHoverStore,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickToBottom = useRef(true);

  /* Follow new output, but only if the user hasn't scrolled up to read older lines **/
  useEffect(() => {
    const el = scrollRef.current;
    if (el && stickToBottom.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [lines]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    stickToBottom.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < STICK_THRESHOLD;
  };

  return (
    <section className="w-full flex flex-col px-4 pointer-events-auto">
      <div className="flex items-center justify-between py-2">
        <DotHeaderReact
          compHeight="30px"
          compWidth="fit-content"
          headerText={otherStrings.loggerHeader()}
        />
        {onClear && (
          <TextButtonReact
            compHeight="30px"
            compWidth="70px"
            handleClick={onClear}
            text={otherStrings.clearButtonText()}
            buttonColor="var(--color-secondary-buttons)"
            buttonHoverColor="var(--color-secondary-buttons-hover)"
            textColor="var(--color-primary-text)"
            onMouseEnter={(e: React.MouseEvent) =>
              helpHoverStore
                .getState()
                .setHelpHoverAtMouse(
                  e.nativeEvent,
                  tooltips.clearButton(),
                  true,
                  -50
                )
            }
            onMouseLeave={() => helpHoverStore.getState().clear()}
          />
        )}
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        role="log"
        aria-live="polite"
        className="h-[200px] overflow-y-auto rounded border border-current/20 p-2
                   font-[family-name:var(--font-family-fira-mono)] text-[12px]
                   text-[var(--color-primary-text)] whitespace-pre-wrap break-words"
      >
        {lines.length === 0 ? (
          <span className="opacity-50">
            {otherStrings.noLogToShowPlaceholder()}
          </span>
        ) : (
          lines.map((line, i) => (
            <div key={i} className="leading-snug">
              {line.replace(ANSI_REGEX, '') || '\u00A0'}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Logger;
