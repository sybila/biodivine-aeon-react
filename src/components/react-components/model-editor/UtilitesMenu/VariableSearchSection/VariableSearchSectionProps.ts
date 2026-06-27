export type VariableSearchSectionProps = {
  submitFunction: (inputText: string) => void;
  setSearchBarRef: (el: HTMLElement) => void;

  textInputTooltipFunction: (e: MouseEvent) => void;
  clearTooltipFunction: () => void;

  /** Css property defining the size of gap between header and other content. */
  gapInsideSection: string;
  /** List of strings which are going to appear under text-input as suggestions. */
  suggestionstrings: Array<string>;
};
