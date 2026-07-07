export type OneButtonSectionProps = {
  headerText: string;
  buttonText: string;
  onClick: () => void;

  /** Css property defining the size of gap between header and other content. */
  gapInsideSection: string;
};
