import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import TextInputSuggestionsReact from '../../../lit-wrappers/TextInputSuggestionsReact';
import type { VariableSearchSectionProps } from './VariableSearchSectionProps';

const VariableSearchSection: React.FC<VariableSearchSectionProps> = ({
  submitFunction,
  setSearchBarRef,

  textInputTooltipFunction,
  clearTooltipFunction,

  gapInsideSection,
  suggestionstrings,
}) => {
  return (
    <section
      className="flex flex-col h-fit w-full z-200"
      style={{ gap: `${gapInsideSection}` }}
    >
      <DotHeaderReact headerText="Variable Search" compHeight="20px" />

      <TextInputSuggestionsReact
        ref={(el) => setSearchBarRef(el as HTMLElement)}
        componentZIndex="200"
        placeholder="Search variables... (press enter to submit)"
        inputHeight="30px"
        inputWidth="320px"
        suggListMinHeight="20px"
        suggListMaxHeight="80px"
        suggListWidth="315px"
        suggLineHeight="18px"
        suggFontSize="17px"
        suggListBgColor="var(--color-tertiary)"
        suggHoverBgColor="var(--color-tertiary-light-highlight)"
        isSeparator={(char) => {
          return char === ',';
        }}
        onSubmit={(value) => submitFunction(value)}
        onInputMouseEnter={(e) => textInputTooltipFunction(e)}
        onInputMouseLeave={() => clearTooltipFunction()}
        suggestionStrings={suggestionstrings}
      />
    </section>
  );
};

export default VariableSearchSection;
