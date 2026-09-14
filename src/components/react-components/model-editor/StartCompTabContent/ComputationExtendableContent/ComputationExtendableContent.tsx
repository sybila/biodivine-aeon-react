import React, { useState } from 'react';
import ExtendableContentReact from '../../../lit-wrappers/ExtendableContentReact';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';
import type { ComputationExtendableContentProps } from './ComputationExtendableContentProps';

const ComputationExtendableContent: React.FC<
  ComputationExtendableContentProps
> = ({ computationName, startComputationFunction, children }) => {
  const [isExtended, setIsExtended] = useState(false);
  const [isExtendedContentHovered, setIsExtendedContentHovered] =
    useState(false);

  const contColor = 'var(--color-secondary)';
  const contBorder = '2px solid var(--color-secondary)';
  const cursorStyle = isExtendedContentHovered ? 'default' : 'pointer';
  const contHoverColor = isExtendedContentHovered
    ? contColor
    : 'var(--color-secondary-light-highlight)';
  const contHoverBorder = isExtendedContentHovered
    ? contBorder
    : '2px solid var(--color-secondary-light-highlight)';

  return (
    <ExtendableContentReact
      style={{ cursor: cursorStyle }}
      contWidth="99%"
      contColor={contColor}
      contHoverColor={contHoverColor}
      contBorder={contBorder}
      contHoverBorder={contHoverBorder}
      buttonHoverColor={contHoverColor}
      buttonColor="none"
      topHeight="30px"
      extended={isExtended}
      onClick={() => setIsExtended(!isExtended)}
    >
      <section
        className="flex flex-col justify-center items-start h-[25px] max-h-full w-full gap-[3px] overflow-auto select-none pl-[20px]"
        slot="top-content"
      >
        <SimpleHeaderReact
          textColor="var(--color-secondary-text)"
          headerText={computationName ?? 'unknown'}
          compHeight="100%"
          compWidth="fit-content"
          lineHeight="25px"
          textFontSize="20px"
          alignHeader="start"
        />
      </section>

      <section
        className="flex flex-col justify-between items-center h-fit w-full gap-3 mt-2 mb-2"
        slot="extended-content"
        onMouseEnter={() => setIsExtendedContentHovered(true)}
        onMouseLeave={() => setIsExtendedContentHovered(false)}
        onClick={(event) => event.stopPropagation()}
      >
        {children}

        <TextButtonReact
          textColor="var(--color-secondary-text)"
          text="Start Computation"
          buttonColor="var(--color-tertiary-buttons)"
          buttonHoverColor="var(--color-tertiary-buttons-hover)"
          onClick={() => startComputationFunction()}
          compHeight="40px"
          compWidth="95%"
        />
      </section>
    </ExtendableContentReact>
  );
};

export default ComputationExtendableContent;
