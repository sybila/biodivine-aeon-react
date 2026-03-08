import type { ComputationStatus } from '../../../types';

/** Zustand store for managing Compute Engine status and computation status.
 * Provides actions to set and clear the status of the Compute Engine
 * and the current computation.
 */
export type ComputeEngineStatusState = {
  computeEngineStatus: string;
  computationStatus: ComputationStatus;
  statusColor: string;
  setStatusColor: (color: string) => void;
  setComputeEngineStatus: (status: string) => void;
  setComputationStatus: (status: ComputationStatus) => void;
  clear: () => void;
};
