export type PerturbationTableRowProps = {
  perturbationId: number;
  numberOfInterpretations: number;
  robustness: number;
  perturbationArray: Array<[string, number]>;
  /** Size of cells in the string format. The cell order: Id, Perturbation, Perturbation Size, Number of Interpretations, Robustness */
  cellSizes: [string, string, string, string, string];
  /** If true, perturbations are visualized in the text format (example: VariableName: true, VariableName2: false) */
  useTextVisualization?: boolean;
};
