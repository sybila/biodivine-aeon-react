import type { AttractorBifurcationExplorerInt } from '../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { BehaviorClassOperationsInt } from '../../../../../services/utilities/BehaviorClassOperations/BehaviorClassOperationsInt';
import type { BifurcationExplorerStatusState } from '../../../../../stores/AttractorBifurcationExplorer/BifurcationExplorerStatusState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type DecisionTableProps = {
  nodeId: number;
  nodeCardinality: number;
  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
  behaviorClassOperationsServ: BehaviorClassOperationsInt;
  bifurcationExplorerStatusStore: ZustandStore<BifurcationExplorerStatusState>;
};
