import type { AttractorBifurcationExplorerInt } from '../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { MessageInt } from '../../../../../services/global/Message/MessageInt';
import type { AttractorBifurcationExplorerPageStringsInt } from '../../../../../services/global/StringProvider/AttractorBifurcationExplorerPageStrings/AttractorBifurcationExplorerPageStringsInt';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type AutoExpandSectionProps = {
  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
  pageStringProviderServ: AttractorBifurcationExplorerPageStringsInt;
  messageServ: MessageInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
