import type { ReactNode } from 'react';

export type ComputationExtendableContentProps = {
  computationName: string;
  startComputationFunction: () => void;

  children?: ReactNode;
};
