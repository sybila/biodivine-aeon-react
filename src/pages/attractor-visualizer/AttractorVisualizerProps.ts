import type { AttractorVisualizerInt } from '../../services/attractor-visualizer/AttractorVisualizerInt';
import type { MessageInt } from '../../services/global/Message/MessageInt';
import type { AttractorVisualizerPageStringsInt } from '../../services/global/StringProvider/AttractorVisualizerPageStrings/AttractorVisualizerPageStringsInt';
import type { AttractorVisualizerStatusState } from '../../stores/AttractorVisualizer/AttractorVisualizerStatusState';
import type { ZustandStore } from '../../stores/ZustandStoreType';

export type AttractorVisualizerProps = {
  attractorVisualizerServ: AttractorVisualizerInt;
  messageServ: MessageInt;
  pageStringProviderServ: AttractorVisualizerPageStringsInt;

  attractorVisualizerStatusStore: ZustandStore<AttractorVisualizerStatusState>;
};
