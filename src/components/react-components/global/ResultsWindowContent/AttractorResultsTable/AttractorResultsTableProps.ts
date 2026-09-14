import type { AttractorBifurcationExplorerInt } from '../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { AttractorVisualizerInt } from '../../../../../services/attractor-visualizer/AttractorVisualizerInt';
import type { ComputationManagerInt } from '../../../../../services/global/ComputationManager/ComputationManagerInt';
import type { GlobalStringsInt } from '../../../../../services/global/StringProvider/GlobalStrings/GlobalStringsInt';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { TabsState } from '../../../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';
import type { AttractorResults } from '../../../../../types/types';

export type AttractorResultsTableProps = {
  results: AttractorResults;

  computationManagerServ: ComputationManagerInt;
  attractorVisualizerServ: AttractorVisualizerInt;
  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
  pageStringProviderServ: GlobalStringsInt;

  tabsStore: ZustandStore<TabsState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
