import React from 'react';
import ExtendableContentReact from '../../../lit-wrappers/ExtendableContentReact';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';
import type { ComputationExtendableContentProps } from './ComputationExtendableContentProps';

const ComputationExtendableContent: React.FC<
  ComputationExtendableContentProps
> = ({ computationName, startComputationFunction, children }) => {
  const [isExtended, setIsExtended] = React.useState(false);

  return (
    <ExtendableContentReact
      contWidth="99%"
      contColor="var(--color-secondary)"
      contHoverColor='var(--color-secondary-light-highlight)'
      contBorder="2px solid var(--color-secondary)"
      contHoverBorder="2px solid var(--color-secondary-light-highlight)"
      buttonColor='none'
      topHeight="30px"
      extended={isExtended}
      onClick={() => setIsExtended(!isExtended)}
    >
      <section
        className="flex flex-col justify-center items-start h-[25px] max-h-full w-full gap-[3px] overflow-auto select-none pl-[20px]"
        slot="top-content"
      >
        <SimpleHeaderReact
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
      >
        {children}

        <TextButtonReact
          text="Start Computation"
          onClick={() => startComputationFunction()}
          compHeight="40px"
          compWidth="95%"
        />
      </section>
    </ExtendableContentReact>
  );
};

export default ComputationExtendableContent;
