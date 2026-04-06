import type { NodeDataTSSD } from '../../../types';

/** Interface which defines service responsible for managing Trap Space Succession Diagram page.  */
export interface TrapSpaceSuccessionDiagramInt {
  init: (container: HTMLDivElement) => void;

  // #region --- Succession diagram management ---

  /** Tests if the succession diagram can be opened. If yes gets it from compute engine. */
  openSuccessionDiagram: () => void;

  /** Inserts the succession diagram into visualization. */
  insertSuccessionDiagram: (
    nodeList: NodeDataTSSD[],
    fit: boolean,
    animate: boolean,
    clearCytoscape: boolean
  ) => void;

  // #endregion

  // #region --- Node Operations ---

  /** Refreshes the selection in the TrapSpaceSuccessionDiagram.
   *  Unselects and re-selects the current selected node. */
  refreshSelection: () => void;

  /** Removes node from the succession diagram. */
  removeNode(nodeId: number): void;

  // #endregion

  // #region --- Decision management ---

  /** Gets all possible decisions for a specific node.
   *  @param nodeId - (number) The ID of the node to fetch decisions for.
   */
  getDecisions(nodeId: number): void;

  /** Extends succession diagram by adding new node corresponding to the selected decision. */
  makeDecision(nodeId: number, decisionId: number): void;

  // #endregion
}
