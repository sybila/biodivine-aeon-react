/** Module of Warnings class for managing warnings over the TrapSpaceSuccessionDiagram page. */
export interface TrapSpaceSuccessionDiagramWarningsInt {
  deleteNodeWithChildrenWarning(
    deleteNodeFunction: () => void,
    deleteChildNodesFunction: () => void
  ): void;
}
