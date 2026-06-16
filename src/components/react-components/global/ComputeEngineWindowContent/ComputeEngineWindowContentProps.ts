import type { ComputationManagerInt } from '../../../../services/global/ComputationManager/ComputationManagerInt';
import type { StringProviderInt } from '../../../../services/global/StringProvider/StringProviderInt';
import type { ComputeEngineStatusState } from '../../../../stores/ComputationManager/ComputeEngineStatusStore/ComputeEngineStatusState';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type ComputeEngineWindowContentProps = {
  computationManagerServ: ComputationManagerInt;
  stringProviderServ: StringProviderInt;

  computeEngineStatusStore: ZustandStore<ComputeEngineStatusState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
