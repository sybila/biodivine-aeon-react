export type SelectionButtonsProps = {
  keys: string[];
  selectedVariables: Record<string, boolean>;
  setSelectedVariables: (selectedVariables: Record<string, boolean>) => void;
  /** Size of the buttons border radius in the form of Css length (e.g. '8px', '0.5rem') */
  buttonBorderRadius?: string;
  /** Size of the buttons in the form of Css length (e.g. '29px', '1.5rem') */
  buttonSize?: string;
};
