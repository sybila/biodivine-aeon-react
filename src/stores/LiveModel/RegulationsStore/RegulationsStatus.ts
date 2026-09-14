import type { EdgeMonotonicity, Regulation } from '../../../types/types';

/**
 * Zustand store for regulations.
 * Provides actions for adding, removing, updating, and querying regulations.
 */
export type RegulationsStatus = {
  regulations: Record<string, Regulation>;
  /** Getter which returns all regulations in the form of array */
  getAllRegulations: () => Regulation[];
  addRegulation: (regulation: Regulation) => void;
  removeRegulation: (regulatorId: number, targetId: number) => void;
  setObservability: (
    regulatorId: number,
    targetId: number,
    isObservable: boolean
  ) => void;
  setMonotonicity: (
    regulatorId: number,
    targetId: number,
    monotonicity: EdgeMonotonicity
  ) => void;
  getRegulationId: (
    regulatorId: number,
    targetId: number
  ) => Regulation | undefined;
  regulationsOf: (targetId: number) => Regulation[];
  regulationsFrom: (regulatorId: number) => Regulation[];
  clear: () => void;
};
