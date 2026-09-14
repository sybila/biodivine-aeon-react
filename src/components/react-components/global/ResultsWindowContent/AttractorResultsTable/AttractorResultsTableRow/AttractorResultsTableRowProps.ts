import type { AttractorVisualizerInt } from '../../../../../../services/attractor-visualizer/AttractorVisualizerInt';
import type { ComputationManagerInt } from '../../../../../../services/global/ComputationManager/ComputationManagerInt';
import type { GlobalStringsInt } from '../../../../../../services/global/StringProvider/GlobalStrings/GlobalStringsInt';
import type { HelpHoverState } from '../../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../../stores/ZustandStoreType';
import type { AttractorBehavior } from '../../../../../../types/types';

export type AttractorResultsTableRowProps = {
  interpretationCount: number;
  behaviorClassList: Array<AttractorBehavior> | undefined;
  textColor?: string;
  textHoverColor?: string;

  computationManagerServ: ComputationManagerInt;
  attractorVisualizerServ: AttractorVisualizerInt;
  pageStringProviderServ: GlobalStringsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
