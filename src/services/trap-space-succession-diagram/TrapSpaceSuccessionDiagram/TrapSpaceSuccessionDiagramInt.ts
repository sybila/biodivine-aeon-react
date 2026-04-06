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
}
