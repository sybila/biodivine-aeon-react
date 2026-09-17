import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import IconButtonReact from '../../../lit-wrappers/IconButtonReact';
import TextInputSuggestionsReact from '../../../lit-wrappers/TextInputSuggestionsReact';
import type { VariableSearchSectionProps } from './VariableSearchSectionProps';

import { useState } from 'react';
import SubmitIcon from '../../../../../assets/icons/check-mark.svg';

const VariableSearchSection: React.FC<VariableSearchSectionProps> = ({
  submitFunction,
  setSearchBarRef,

  textInputTooltipFunction,
  submitButtonTooltipFunction,
  clearTooltipFunction,

  gapInsideSection,
  suggestionstrings,
}) => {
  const [currentValue, setCurrentValue] = useState('');

  return (
    <section
      className="flex flex-col h-fit w-full z-200"
      style={{ gap: `${gapInsideSection}` }}
    >
      <DotHeaderReact
        textColor="var(--color-primary-text)"
        headerText="Variable Search"
        compHeight="20px"
      />

      <div className="h-fit w-full flex flex-row justify-around items-start">
        <TextInputSuggestionsReact
          ref={(el) => setSearchBarRef(el as HTMLElement)}
          componentZIndex="200"
          placeholder="Search variables... (press enter to submit)"
          inputHeight="30px"
          inputWidth="270px"
          suggListMinHeight="20px"
          suggListMaxHeight="150px"
          suggListWidth="265px"
          suggLineHeight="18px"
          suggFontSize="17px"
          textColor="var(--color-secondary-text)"
          inputColor="var(--color-secondary-text-inputs)"
          inputBorderColor="var(--color-secondary-text-inputs-border)"
          suggListBgColor="var(--color-tertiary)"
          suggHoverBgColor="var(--color-tertiary-light-highlight)"
          isSeparator={(char) => {
            return char === ',';
          }}
          onSubmit={(value) => submitFunction(value)}
          onWrite={(value) => setCurrentValue(value)}
          onInputMouseEnter={(e) => textInputTooltipFunction(e)}
          onInputMouseLeave={() => clearTooltipFunction()}
          suggestionStrings={suggestionstrings}
        />

        <IconButtonReact
          compHeight="30px"
          compWidth="30px"
          buttonSize="30px"
          iconAlt="S"
          iconSrc={SubmitIcon}
          handleClick={() => submitFunction(currentValue)}
          onMouseEnter={(e: React.MouseEvent) => submitButtonTooltipFunction(e.nativeEvent)}
          onMouseLeave={() => clearTooltipFunction()}
        />
      </div>
    </section>
  );
};

export default VariableSearchSection;
