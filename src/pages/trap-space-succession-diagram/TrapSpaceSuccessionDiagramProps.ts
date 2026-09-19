import type { TrapSpaceSDPageStringsInt } from '../../services/global/StringProvider/TrapSpaceSDPageStrings/TrapSpaceSDPageStringsInt';
import type { TrapSpaceSuccessionDiagramInt } from '../../services/trap-space-succession-diagram/TrapSpaceSuccessionDiagram/TrapSpaceSuccessionDiagramInt';
import type { HelpHoverState } from '../../stores/HelpHover/HelpHoverState';
import type { TrapSpaceSDStatusState } from '../../stores/TrapSpaceSuccessionDiagram/TrapSpaceSDStatusState';
import type { ZustandStore } from '../../stores/ZustandStoreType';

export type TrapSpaceSuccessionDiagramProps = {
  trapSpaceSDServ: TrapSpaceSuccessionDiagramInt;
  pageStringProviderServ: TrapSpaceSDPageStringsInt;

  trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
