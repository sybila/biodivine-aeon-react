import type { AttractorBifurcationExplorerInt } from '../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { BifurcationExplorerStatusState } from '../../stores/AttractorBifurcationExplorer/BifurcationExplorerStatusState';
import type { ZustandStore } from '../../stores/ZustandStoreType';

export type AttractorBifurcationExplorerProps = {
  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
  bifurcationExplorerStatusStore: ZustandStore<BifurcationExplorerStatusState>;
};
