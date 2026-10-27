export type TrapSpaceResponse = {
  isRunning: boolean;
  computationStarted: number;
  elapsed: number;
  computationCancelled: boolean;
  error?: string | undefined;
  version: string;
};
