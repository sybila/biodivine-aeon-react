import { useMemo } from 'react';
import SectionWithDotHeader from '../../../../global/SectionWithDotHeader/SectionWithDotHeader';
import SeparatorLine from '../../../../global/SeparatorLine/SeparatorLine';
import ColoredWordsReact from '../../../../lit-wrappers/ColoredWordsReact';
import ExtendableContentReact from '../../../../lit-wrappers/ExtendableContentReact';
import StatEntryReact from '../../../../lit-wrappers/StatEntryReact';
import TextButtonReact from '../../../../lit-wrappers/TextButtonReact';
import type { StableMotifRowProps } from './StableMotifRowProps';

type Word = {
  text: string;
  color: string;
  weight: string;
};

const StableMotifRow: React.FC<StableMotifRowProps> = ({
  nodeId,
  stableMotifData,

  trapSpaceSDServ,
  generalStringsServ,
  tooltipStringsServ,

  helpHoverStore,
}) => {
  const stableMotifVariables = useMemo(() => {
    return Object.entries(stableMotifData.variableValues);
  }, [stableMotifData]);

  if (stableMotifVariables.length < 1) {
    return;
  }

  const [words, cutWords] = useMemo(() => {
    const maxLength = 30;

    const allWords = new Array<Word>();
    const cutWords = new Array<Word>();
    let currentLength = 0;

    for (const motif of stableMotifVariables) {
      const varName = motif[0];
      const value = motif[1];

      if (value === undefined) {
        continue;
      }

      const motifAsWord = {
        text: `${varName}:${value}`,
        color: value === 0 ? 'var(--color-negative)' : 'var(--color-positive)',
        weight: 'bold',
      };

      allWords.push(motifAsWord);

      if (currentLength < maxLength) {
        if (motifAsWord.text.length + currentLength <= maxLength) {
          cutWords.push(motifAsWord);
          length += motifAsWord.text.length;
        } else {
          const remainingSpace = maxLength - currentLength;

          const cutMotifAsWord = { ...motifAsWord };

          cutMotifAsWord.text = `${cutMotifAsWord.text.slice(0, remainingSpace)}...`;

          cutWords.push(cutMotifAsWord);
          length += cutMotifAsWord.text.length;
        }
      }
    }

    return [allWords, cutWords];
  }, [stableMotifVariables]);

  const renderTopSection = () => {
    return (
      <section
        className="flex flex-col justify-between items-center h-full w-full gap-[3px] overflow-auto select-none"
        slot="top-content"
      >
        <ColoredWordsReact
          contMinHeight="23px"
          contMaxHeight="23px"
          contMinWidth="97%"
          contMaxWidth="97%"
          contOverflowY="hidden"
          fontSize="20px"
          fontFamily="var(--font-family-fira-bold)"
          words={cutWords}
        />

        <div className="flex flex-col justify-between items-center h-[45px] w-[97%]">
          <StatEntryReact
            compWidth="100%"
            nameMaxWidth="60%"
            valueMaxWidth="38%"
            statName="Number of Interpretations"
            statValue={stableMotifData.numberOfInterpretations.toString()}
            contBgColor="var(--color-tertiary)"
            textColor="var(--color-tertiary-text)"
          />
          <StatEntryReact
            compWidth="100%"
            nameMaxWidth="64%"
            valueMaxWidth="30%"
            statName="Number of Min. Trap Spaces"
            contBgColor="var(--color-tertiary)"
            textColor="var(--color-tertiary-text)"
            statValue={stableMotifData.numberOfMinTrapSpaces.toString()}
          />
        </div>

        <TextButtonReact
          className="mb-[7px]"
          text={generalStringsServ.selectDecisionButton()}
          compHeight="30px"
          compWidth="97%"
          textColor="var(--color-tertiary-text)"
          buttonColor="var(--color-tertiary-buttons)"
          buttonHoverColor="var(--color-tertiary-buttons-hover)"
          handleClick={() => {
            helpHoverStore.getState().clear();
            trapSpaceSDServ.makeDecision(
              nodeId,
              stableMotifData,
              stableMotifData.possibleChildNodes[0].id
            );
          }}
          onMouseEnter={(e: React.MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e.nativeEvent,
                tooltipStringsServ.selectDecisionButton(),
                true,
                -50
              )
          }
          onMouseLeave={() => helpHoverStore.getState().clear()}
        />
      </section>
    );
  };

  const renderBottomSection = () => {
    return (
      <section
        slot="extended-content"
        className="flex flex-col justify-start items-center h-full max-h-full w-full gap-2 overflow-auto select-none"
      >
        <SeparatorLine width={'96%'} />

        <SectionWithDotHeader
          text={generalStringsServ.fullStableMotifStateHeader()}
        >
          <ColoredWordsReact
            contMinHeight="23px"
            contMaxHeight="98%"
            contMinWidth="97%"
            contMaxWidth="97%"
            contOverflowY="auto"
            fontSize="20px"
            fontFamily="var(--font-family-fira-bold)"
            words={words}
          />
        </SectionWithDotHeader>
      </section>
    );
  };

  return (
    <ExtendableContentReact
      contWidth="100%"
      topHeight="120px"
      topContentHeight="120px"
      topBottomGap="5px"
      extendContentHeight="150px"
      contColor="var(--color-secondary-light)"
      contHoverColor="var(--color-secondary-light-highlight)"
      contBorder="2px var(--color-secondary-light) solid"
      contHoverBorder="2px var(--color-secondary-border) dashed"
      buttonColor="var(--color-tertiary-buttons)"
      buttonHoverColor="var(--color-tertiary-buttons-hover)"
    >
      {renderTopSection()}
      {renderBottomSection()}
    </ExtendableContentReact>
  );
};

export default StableMotifRow;
