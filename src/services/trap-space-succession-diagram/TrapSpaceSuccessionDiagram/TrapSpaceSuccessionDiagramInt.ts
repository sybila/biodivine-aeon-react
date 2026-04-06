import type { NodeDataTSSD } from '../../../types';

export interface TrapSpaceSuccessionDiagramInt {
  init: (container: HTMLDivElement) => void;

  insertSuccessionDiagram: (
    nodeList: NodeDataTSSD[],
    fit: boolean,
    animate: boolean,
    clearCytoscape: boolean
  ) => void;
}
