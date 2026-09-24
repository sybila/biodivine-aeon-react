import type { AttractorClassesTabOtherStringsInt } from '../../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/OtherStrings/AttractorClassesTab/AttractorClassesTabOtherStringsInt';
import type { AttractorClassesTabTooltipsInt } from '../../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/Tooltips/AttractorClassesTab/AttractorClassesTabTooltipsInt';
import type { TrapSpaceSuccessionDiagramInt } from '../../../../../../services/trap-space-succession-diagram/TrapSpaceSuccessionDiagram/TrapSpaceSuccessionDiagramInt';
import type { HelpHoverState } from '../../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../../stores/ZustandStoreType';
import type { AttractorBehavior } from '../../../../../../types/types';

export type AttractorClassesTableRowProps = {
  interpretationCount: number;
  behaviorClassList: Array<AttractorBehavior>;
  textColor?: string;
  textHoverColor?: string;

  trapSpaceSDServ: TrapSpaceSuccessionDiagramInt;
  generalStringsServ: AttractorClassesTabOtherStringsInt;
  tooltipStringsServ: AttractorClassesTabTooltipsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
