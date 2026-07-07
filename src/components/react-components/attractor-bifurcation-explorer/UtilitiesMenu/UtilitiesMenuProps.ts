import type { AttractorBifurcationExplorerInt } from '../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { ModelEditorPageStringsInt } from '../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { BifurcationExplorerStatusState } from '../../../../stores/AttractorBifurcationExplorer/BifurcationExplorerStatusState';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type UtilitiesMenuProps = {
  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
  pageStringProviderServ: ModelEditorPageStringsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
  bifurcationExplorerStatusStore: ZustandStore<BifurcationExplorerStatusState>;
};
