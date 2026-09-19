import type { MakeDecisionTabOtherStringsInt } from '../../../../services/global/StringProvider/TrapSpaceSDPageStrings/OtherStrings/MakeDecisionTab/MakeDecisionTabOtherStringsInt';
import type { MakeDecisionTabTooltipsInt } from '../../../../services/global/StringProvider/TrapSpaceSDPageStrings/Tooltips/MakeDecisionTab/MakeDecisionTabTooltipsInt';
import type { TrapSpaceSuccessionDiagramInt } from '../../../../services/trap-space-succession-diagram/TrapSpaceSuccessionDiagram/TrapSpaceSuccessionDiagramInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { TrapSpaceSDStatusState } from '../../../../stores/TrapSpaceSuccessionDiagram/TrapSpaceSDStatusState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type MakeDecisionTabContentProps = {
  trapSpaceSDServ: TrapSpaceSuccessionDiagramInt;
  generalStringsServ: MakeDecisionTabOtherStringsInt;
  tooltipStringsServ: MakeDecisionTabTooltipsInt;

  trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
