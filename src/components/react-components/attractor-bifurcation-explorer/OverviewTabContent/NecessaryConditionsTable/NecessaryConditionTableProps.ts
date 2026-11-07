import type { AttractorBifurcationExplorerInt } from '../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';

export type NecessaryConditionTableProps = {
  maxTableHeight: string;
  minTableHeight: string;
  tableWidth: string;

  nodeId: number;
  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
};
