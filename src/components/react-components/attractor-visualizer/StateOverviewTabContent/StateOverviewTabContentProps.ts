import type { AttractorVisualizerInt } from '../../../../services/attractor-visualizer/AttractorVisualizerInt';
import type { AttractorVisualizerStatusState } from '../../../../stores/AttractorVisualizer/AttractorVisualizerStatusState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type StateOverviewTabContentProps = {
  attractorVisualizerServ: AttractorVisualizerInt;
  attractorVisualizerStatusStore: ZustandStore<AttractorVisualizerStatusState>;
};
