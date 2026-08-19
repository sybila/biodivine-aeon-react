import type { AttractorBifurcationExplorerInt } from '../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { MessageInt } from '../../../../services/global/Message/MessageInt';
import type { AttractorBifurcationExplorerPageStringsInt } from '../../../../services/global/StringProvider/AttractorBifurcationExplorerPageStrings/AttractorBifurcationExplorerPageStringsInt';
import type { BehaviorClassOperationsInt } from '../../../../services/utilities/BehaviorClassOperations/BehaviorClassOperationsInt';
import type { BifurcationExplorerStatusState } from '../../../../stores/AttractorBifurcationExplorer/BifurcationExplorerStatusState';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type MakeDecisionTabContentProps = {
  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
  behaviorClassOperationsServ: BehaviorClassOperationsInt;
  messageServ: MessageInt;
  pageStringProviderServ: AttractorBifurcationExplorerPageStringsInt;

  bifurcationExplorerStatusStore: ZustandStore<BifurcationExplorerStatusState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
