import type { AttractorBifurcationExplorerInt } from '../../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { AttractorBifurcationExplorerPageStringsInt } from '../../../../../../services/global/StringProvider/AttractorBifurcationExplorerPageStrings/AttractorBifurcationExplorerPageStringsInt';
import type { BifurcationExplorerStatusState } from '../../../../../../stores/AttractorBifurcationExplorer/BifurcationExplorerStatusState';
import type { HelpHoverState } from '../../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../../stores/ZustandStoreType';
import type {
  StabilityAnalysisModes,
  StabilityAnalysisVariable,
} from '../../../../../../types/types';

export type StabilityAnalysisTableRowProps = StabilityAnalysisVariable & {
  computedBehavior: StabilityAnalysisModes;

  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
  pageStringProviderServ: AttractorBifurcationExplorerPageStringsInt;

  bifurcationExplorerStatusStore: ZustandStore<BifurcationExplorerStatusState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
