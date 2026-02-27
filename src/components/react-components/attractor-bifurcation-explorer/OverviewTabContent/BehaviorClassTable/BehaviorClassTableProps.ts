import type { AttractorBifurcationExplorerInt } from '../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { AttractorClassBE } from '../../../../../types';

export type BehaviorClassTableProps = {
  classes: AttractorClassBE[];
  nodeCardinality: number;
  isLeaf: boolean;
  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
};
