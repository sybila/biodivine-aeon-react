import type { ComputationStatus, NodeDataBE } from '../../../../types';

export type AttractorResponse = {
  timestamp: number | undefined;
  is_canceled: boolean;
  running: boolean;

  progress: string;
  error: string | undefined;
  num_classes: number | undefined;
  version: string;
  is_running: boolean | undefined;
};

export type ControlResponse = {
  isRunning: boolean;
  computationStarted: number;
  elapsed: number;
  computationCancelled: boolean;
  error?: string | undefined;
  version: string;
};

export type ComputationInfo = {
  computeEngineStatus: string;
  computationStatus: ComputationStatus;
  statusColor: string;
};

export type DeleteBifDecisionResponse = {
  node: NodeDataBE | undefined;
  removed: number[] | undefined;
};
