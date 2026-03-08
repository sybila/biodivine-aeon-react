import AttractorBifurcationExplorer from '../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorer';
import type { AttractorBifurcationExplorerInt } from '../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { AttractorBifurcationTreeVisualizationInt } from '../../services/attractor-bifurcation-explorer/CytoscapeABE/AttractorBifurcationTreeVisualizationInt';
import CytoscapeABE from '../../services/attractor-bifurcation-explorer/CytoscapeABE/CytoscapeABE';
import type { AttractorVisualizerInt } from '../../services/attractor-visualizer/AttractorVisualizerInt';
import type { ComputationManagerInt } from '../../services/global/ComputationManager/ComputationManagerInt';
import type { BehaviorClassOperationsInt } from '../../services/utilities/BehaviorClassOperations/BehaviorClassOperationsInt';
import type { StoresProviderInt } from '../StoresProvider/StoresProviderInt';
import type { AttractorBifurcationExplorerServicesProviderInt } from './AttractorBifurcationExplorerServicesProviderInt';

class AttractorBifurcationExplorerServicesProvider implements AttractorBifurcationExplorerServicesProviderInt {
  public attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;

  constructor(
    computationManagerServ: ComputationManagerInt,
    attractorVisualizerServ: AttractorVisualizerInt,
    behaviorClassOperationsServ: BehaviorClassOperationsInt,
    storesProvider: StoresProviderInt
  ) {
    const bifurcationTreeVisualization: AttractorBifurcationTreeVisualizationInt =
      new CytoscapeABE(
        behaviorClassOperationsServ,
        storesProvider.bifurcationExplorerStatusStore
      );
    this.attractorBifurcationExplorerServ = new AttractorBifurcationExplorer(
      computationManagerServ,
      attractorVisualizerServ,
      bifurcationTreeVisualization,
      storesProvider.bifurcationExplorerStatusStore
    );
  }
}

export default AttractorBifurcationExplorerServicesProvider;
