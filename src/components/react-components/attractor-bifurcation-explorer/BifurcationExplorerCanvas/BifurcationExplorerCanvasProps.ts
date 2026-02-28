import type { AttractorBifurcationExplorerInt } from '../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';

export type BifurcationExplorerCanvasProps = {
  initialized: boolean;
  setInitialized: (initialized: boolean) => void;
  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
};
