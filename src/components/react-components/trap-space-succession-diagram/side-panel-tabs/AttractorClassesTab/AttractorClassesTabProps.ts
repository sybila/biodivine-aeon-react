import type { AttractorClassesTabOtherStringsInt } from "../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/OtherStrings/AttractorClassesTab/AttractorClassesTabOtherStringsInt";
import type { AttractorClassesTabTooltipsInt } from "../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/Tooltips/AttractorClassesTab/AttractorClassesTabTooltipsInt";
import type { TrapSpaceSuccessionDiagramInt } from "../../../../../services/trap-space-succession-diagram/TrapSpaceSuccessionDiagram/TrapSpaceSuccessionDiagramInt";
import type { HelpHoverState } from "../../../../../stores/HelpHover/HelpHoverState";
import type { TrapSpaceSDStatusState } from "../../../../../stores/TrapSpaceSuccessionDiagram/TrapSpaceSDStatusState";
import type { ZustandStore } from "../../../../../stores/ZustandStoreType";

export type AttractorClassesTabProps = {
  trapSpaceSDServ: TrapSpaceSuccessionDiagramInt;
  generalStringsServ: AttractorClassesTabOtherStringsInt;
  tooltipStringsServ: AttractorClassesTabTooltipsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
  trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>;
};
