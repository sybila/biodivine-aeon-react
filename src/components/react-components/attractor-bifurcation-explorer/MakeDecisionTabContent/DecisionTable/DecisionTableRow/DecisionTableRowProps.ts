import type { AttractorBifurcationExplorerInt } from '../../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { AttractorBifurcationExplorerPageStringsInt } from '../../../../../../services/global/StringProvider/AttractorBifurcationExplorerPageStrings/AttractorBifurcationExplorerPageStringsInt';
import type { BehaviorClassOperationsInt } from '../../../../../../services/utilities/BehaviorClassOperations/BehaviorClassOperationsInt';
import type { HelpHoverState } from '../../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../../stores/ZustandStoreType';
import type { Decision } from '../../../../../../types';

export type DecisionTableRowProps = {
  decision: Decision;
  nodeId: number;
  nodeCardinality: number;

  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
  behaviorClassOperationsServ: BehaviorClassOperationsInt;
  pageStringProviderServ: AttractorBifurcationExplorerPageStringsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
