import AttractorVisualizer from '../../services/attractor-visualizer/AttractorVisualizer';
import type { AttractorVisualizerInt } from '../../services/attractor-visualizer/AttractorVisualizerInt';
import type { ComputationManagerInt } from '../../services/global/ComputationManager/ComputationManagerInt';
import type { StoresProviderInt } from '../StoresProvider/StoresProviderInt';
import type { AttractorVisualizerServicesProviderInt } from './AttractorVisualizerServicesProviderInt';

class AttractorVisualizerServicesProvider implements AttractorVisualizerServicesProviderInt {
  attractorVisualizerServ: AttractorVisualizerInt;

  constructor(
    computationManagerServ: ComputationManagerInt,
    storesProvider: StoresProviderInt
  ) {
    this.attractorVisualizerServ = new AttractorVisualizer(
      computationManagerServ,
      storesProvider.attractorVisualizerStatusStore,
      storesProvider.tabsStore
    );
  }
}

export default AttractorVisualizerServicesProvider;
