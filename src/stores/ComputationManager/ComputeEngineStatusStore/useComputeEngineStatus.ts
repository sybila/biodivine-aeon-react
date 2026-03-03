import { create } from 'zustand';
import config from '../../../config';
import type { ComputationStatus } from '../../../types';
import type { ComputeEngineStatusState } from './ComputeEngineStatusState';

/** Zustand store for managing Compute Engine status and computation status.
 * Provides actions to set and clear the status of the Compute Engine
 * and the current computation.
 */
const useComputeEngineStatus = create<ComputeEngineStatusState>()((set) => ({
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
      computeEngineStatus: config.computeEngine.initialStatus ?? 'Disconnected',
      computationStatus: {
        status: 'No computation',
        running: false,
      } as ComputationStatus,
      statusColor: config.computeEngine.initialStatusColor ?? 'red',
    }),
}));

export default useComputeEngineStatus;
