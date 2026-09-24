import type { MakeDecisionTabOtherStringsInt } from '../../../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/OtherStrings/MakeDecisionTab/MakeDecisionTabOtherStringsInt';
import type { MakeDecisionTabTooltipsInt } from '../../../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/Tooltips/MakeDecisionTab/MakeDecisionTabTooltipsInt';
import type { TrapSpaceSuccessionDiagramInt } from '../../../../../../../services/trap-space-succession-diagram/TrapSpaceSuccessionDiagram/TrapSpaceSuccessionDiagramInt';
import type { HelpHoverState } from '../../../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../../../stores/ZustandStoreType';
import type { DecisionTSSD } from '../../../../../../../types/types';

export type StableMotifRowProps = {
  nodeId: number;
  stableMotifData: DecisionTSSD;

  trapSpaceSDServ: TrapSpaceSuccessionDiagramInt;
  generalStringsServ: MakeDecisionTabOtherStringsInt;
  tooltipStringsServ: MakeDecisionTabTooltipsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
