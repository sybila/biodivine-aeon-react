import type { TrapSpaceSDPageStringsInt } from '../../services/global/StringProvider/TrapSpaceSDPageStrings/TrapSpaceSDPageStringsInt';
import type { TrapSpaceSuccessionDiagramInt } from '../../services/trap-space-succession-diagram/TrapSpaceSuccessionDiagram/TrapSpaceSuccessionDiagramInt';
import type { SearchAndFilterHelpersInt } from '../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import type { HelpHoverState } from '../../stores/HelpHover/HelpHoverState';
import type { VariablesStatus } from '../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { TrapSpaceSDStatusState } from '../../stores/TrapSpaceSuccessionDiagram/TrapSpaceSDStatusState';
import type { ZustandStore } from '../../stores/ZustandStoreType';

export type TrapSpaceSuccessionDiagramProps = {
  trapSpaceSDServ: TrapSpaceSuccessionDiagramInt;
  pageStringProviderServ: TrapSpaceSDPageStringsInt;
  searchAndFilterHelpersServ: SearchAndFilterHelpersInt;

  trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>;
  variablesStore: ZustandStore<VariablesStatus>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
