import type { AttractorVisualizerInt } from '../../services/attractor-visualizer/AttractorVisualizerInt';
import type { MessageInt } from '../../services/global/Message/MessageInt';
import type { StringProviderInt } from '../../services/global/StringProvider/StringProviderInt';
import type { AttractorVisualizerStatusState } from '../../stores/AttractorVisualizer/AttractorVisualizerStatusState';
import type { ZustandStore } from '../../stores/ZustandStoreType';

export type AttractorVisualizerProps = {
  attractorVisualizerServ: AttractorVisualizerInt;
  messageServ: MessageInt;
  stringProviderServ: StringProviderInt;

  attractorVisualizerStatusStore: ZustandStore<AttractorVisualizerStatusState>;
};
