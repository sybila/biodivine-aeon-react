import type { AttractorVisualizerInt } from '../../../../../../services/attractor-visualizer/AttractorVisualizerInt';
import type { ComputationManagerInt } from '../../../../../../services/global/ComputationManager/ComputationManagerInt';
import type { StringProviderInt } from '../../../../../../services/global/StringProvider/StringProviderInt';
import type { HelpHoverState } from '../../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../../stores/ZustandStoreType';
import type { AttractorBehavior } from '../../../../../../types';

export type AttractorResultsTableRowProps = {
  interpretationCount: number;
  behaviorClassList: Array<AttractorBehavior> | undefined;
  computationManagerServ: ComputationManagerInt;
  attractorVisualizerServ: AttractorVisualizerInt;
  stringProviderServ: StringProviderInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
