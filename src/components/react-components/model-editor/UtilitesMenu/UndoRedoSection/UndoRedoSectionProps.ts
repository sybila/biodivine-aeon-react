export type UndoRedoSectionProps = {
  undoFunction: () => void;
  redoFunction: () => void;

  undoTooltipFunction: (e: MouseEvent) => void;
  redoTooltipFunction: (e: MouseEvent) => void;
  clearTooltipFunction: () => void;

  /** Css property defining the size of gap between header and other content. */
  gapInsideSection: string;
};
