import type { ComputationStatus } from '../../../types';

export type ComputeEngineStatusState = {
  computeEngineStatus: string;
  computationStatus: ComputationStatus;
  statusColor: string;
  setStatusColor: (color: string) => void;
  setComputeEngineStatus: (status: string) => void;
  setComputationStatus: (status: ComputationStatus) => void;
  clear: () => void;
};
