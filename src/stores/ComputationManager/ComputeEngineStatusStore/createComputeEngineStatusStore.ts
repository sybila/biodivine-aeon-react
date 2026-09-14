import { create } from 'zustand';
import config from '../../../config';
import type { ComputationStatus } from '../../../types/types';
import type { ZustandStore } from '../../ZustandStoreType';
import type { ComputeEngineStatusState } from './ComputeEngineStatusState';

function createComputeEngineStatusStore(): ZustandStore<ComputeEngineStatusState> {
  return create<ComputeEngineStatusState>()((set) => ({
    computeEngineStatus: config.computeEngine.initialStatus ?? 'Disconnected',
    computationStatus: {
      status: 'No computation',
      running: false,
    } as ComputationStatus,
    statusColor: config.computeEngine.initialStatusColor ?? 'red',
    setStatusColor: (color) => set({ statusColor: color }),
    setComputeEngineStatus: (status) => set({ computeEngineStatus: status }),
    setComputationStatus: (status) => set({ computationStatus: status }),
    clear: () =>
      set({
        computeEngineStatus:
          config.computeEngine.initialStatus ?? 'Disconnected',
        computationStatus: {
          status: 'No computation',
          running: false,
        } as ComputationStatus,
        statusColor: config.computeEngine.initialStatusColor ?? 'red',
      }),
  }));
}

export default createComputeEngineStatusStore;
