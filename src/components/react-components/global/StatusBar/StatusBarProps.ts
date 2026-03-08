import type { ComputeEngineStatusState } from '../../../../stores/ComputationManager/ComputeEngineStatusStore/ComputeEngineStatusState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type StatusBarProps = {
  onClick: () => void;
  computeEngineStatusStore: ZustandStore<ComputeEngineStatusState>;
};
