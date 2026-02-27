import type { AttractorBifurcationExplorerInt } from '../../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { BehaviorClassOperationsInt } from '../../../../../../services/utilities/BehaviorClassOperations/BehaviorClassOperationsInt';
import type { Decision } from '../../../../../../types';

export type DecisionTableRowProps = {
  decision: Decision;
  nodeId: number;
  nodeCardinality: number;
  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
  behaviorClassOperationsServ: BehaviorClassOperationsInt;
};
