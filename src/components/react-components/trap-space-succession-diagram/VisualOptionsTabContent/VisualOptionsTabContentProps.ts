import type { VisualOptionsTabOtherStringsInt } from '../../../../services/global/StringProvider/TrapSpaceSDPageStrings/OtherStrings/VisualOptionsTab/VisualOptionsTabOtherStringsInt';
import type { VisualOptionsTabTooltipsInt } from '../../../../services/global/StringProvider/TrapSpaceSDPageStrings/Tooltips/VisualOptionsTab/VisualOptionsTabTooltipsInt';
import type { TrapSpaceSuccessionDiagramInt } from '../../../../services/trap-space-succession-diagram/TrapSpaceSuccessionDiagram/TrapSpaceSuccessionDiagramInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type VisualOptionsTabContentProps = {
  trapSpaceSDServ: TrapSpaceSuccessionDiagramInt;

  generalStringsServ: VisualOptionsTabOtherStringsInt;
  tooltipStringsServ: VisualOptionsTabTooltipsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
