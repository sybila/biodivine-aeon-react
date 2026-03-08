import type { ComputationManagerInt } from '../../../../services/global/ComputationManager/ComputationManagerInt';
import type { ComputeEngineStatusState } from '../../../../stores/ComputationManager/ComputeEngineStatusStore/ComputeEngineStatusState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type ComputeEngineWindowContentProps = {
  computationManagerServ: ComputationManagerInt;

  computeEngineStatusStore: ZustandStore<ComputeEngineStatusState>;
};
