import type { ComputeEngineStatusState } from '../../../../stores/ComputationManager/ComputeEngineStatusStore/ComputeEngineStatusState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type StatusBarProps = {
  onClick: () => void;
  setHelpHover: (e: MouseEvent) => void;
  clearHelpHover: () => void;
  computeEngineStatusStore: ZustandStore<ComputeEngineStatusState>;
};
