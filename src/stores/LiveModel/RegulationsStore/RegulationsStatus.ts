import type { EdgeMonotonicity, Regulation } from '../../../types';

export type RegulationsStatus = {
  regulations: Record<string, Regulation>;
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
