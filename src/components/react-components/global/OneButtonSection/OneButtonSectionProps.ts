export type OneButtonSectionProps = {
  headerText: string;
  buttonText: string;
  buttonTooltipFunction: (e: MouseEvent) => void;
  hideTooltipFunction: () => void;
  onClick: () => void;

  /** Css property defining the size of gap between header and other content. */
  gapInsideSection: string;
  headerTextColor: string;
  buttonTextColor: string;
  buttonColor: string;
};
