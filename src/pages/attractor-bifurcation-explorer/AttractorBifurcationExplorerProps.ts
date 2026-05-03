import type { AttractorBifurcationExplorerInt } from '../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { StringProviderInt } from '../../services/global/StringProvider/StringProviderInt';
import type { BehaviorClassOperationsInt } from '../../services/utilities/BehaviorClassOperations/BehaviorClassOperationsInt';
import type { BifurcationExplorerStatusState } from '../../stores/AttractorBifurcationExplorer/BifurcationExplorerStatusState';
import type { HelpHoverState } from '../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../stores/ZustandStoreType';

export type AttractorBifurcationExplorerProps = {
  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
  behaviorClassOperationsServ: BehaviorClassOperationsInt;
  stringProviderServ: StringProviderInt;

  bifurcationExplorerStatusStore: ZustandStore<BifurcationExplorerStatusState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
