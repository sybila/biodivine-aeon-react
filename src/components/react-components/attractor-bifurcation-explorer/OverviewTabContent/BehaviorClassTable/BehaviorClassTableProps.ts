import type { AttractorBifurcationExplorerInt } from '../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { BehaviorClassOperationsInt } from '../../../../../services/utilities/BehaviorClassOperations/BehaviorClassOperationsInt';
import type { AttractorClassBE } from '../../../../../types';

export type BehaviorClassTableProps = {
  classes: AttractorClassBE[];
  nodeCardinality: number;
  isLeaf: boolean;
  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
  behaviorClassOperationsServ: BehaviorClassOperationsInt;
};
