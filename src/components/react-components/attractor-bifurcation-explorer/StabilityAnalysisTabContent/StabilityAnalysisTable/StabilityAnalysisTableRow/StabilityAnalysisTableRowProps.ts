import type { AttractorBifurcationExplorerInt } from '../../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { BifurcationExplorerStatusState } from '../../../../../../stores/AttractorBifurcationExplorer/BifurcationExplorerStatusState';
import type { ZustandStore } from '../../../../../../stores/ZustandStoreType';
import type {
  StabilityAnalysisModes,
  StabilityAnalysisVariable,
} from '../../../../../../types';

export type StabilityAnalysisTableRowProps = StabilityAnalysisVariable & {
  computedBehavior: StabilityAnalysisModes;
  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
  bifurcationExplorerStatusStore: ZustandStore<BifurcationExplorerStatusState>;
};
