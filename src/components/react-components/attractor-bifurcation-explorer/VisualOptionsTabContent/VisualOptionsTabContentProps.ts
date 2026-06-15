import type { AttractorBifurcationExplorerInt } from '../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { StringProviderInt } from '../../../../services/global/StringProvider/StringProviderInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type VisualOptionsTabContentProps = {
  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;

  stringProviderServ: StringProviderInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
