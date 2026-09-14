import type { ComputationManagerInt } from '../../../../services/global/ComputationManager/ComputationManagerInt';
import type { GlobalStringsInt } from '../../../../services/global/StringProvider/GlobalStrings/GlobalStringsInt';
import type { ComputeEngineStatusState } from '../../../../stores/ComputationManager/ComputeEngineStatusStore/ComputeEngineStatusState';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type ComputeEngineWindowContentProps = {
  computationManagerServ: ComputationManagerInt;
  pageStringProviderServ: GlobalStringsInt;

  computeEngineStatusStore: ZustandStore<ComputeEngineStatusState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
