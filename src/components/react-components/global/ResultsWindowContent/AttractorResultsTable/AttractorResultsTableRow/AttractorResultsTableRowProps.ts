import type { AttractorVisualizerInt } from '../../../../../../services/attractor-visualizer/AttractorVisualizerInt';
import type { ComputationManagerInt } from '../../../../../../services/global/ComputationManager/ComputationManagerInt';
import type { AttractorBehavior } from '../../../../../../types';

export type AttractorResultsTableRowProps = {
  interpretationCount: number;
  behaviorClassList: Array<AttractorBehavior> | undefined;
  computationManagerServ: ComputationManagerInt;
  attractorVisualizerServ: AttractorVisualizerInt;
};
