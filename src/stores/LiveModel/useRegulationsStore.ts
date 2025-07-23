import { create } from 'zustand';
import { EdgeMonotonicity, type Regulation } from '../../types';

/**
 * Zustand store for regulations.
 * Provides actions for adding, removing, updating, and querying regulations.
 */
type RegulationsState = {
  regulations: Record<string, Regulation>;
  getAllRegulations: () => Regulation[];
  addRegulation: (regulation: Regulation) => void;
  removeRegulation: (regulatorId: number, targetId: number) => void;
  setObservability: (
    regulatorId: number,
    targetId: number,
    isObservable: boolean
  ) => void;
  toggleObservability: (regulatorId: number, targetId: number) => void;
  setMonotonicity: (
    regulatorId: number,
    targetId: number,
    monotonicity: EdgeMonotonicity
  ) => void;
  toggleMonotonicity: (regulatorId: number, targetId: number) => void;
  getRegulationId: (
    regulatorId: number,
    targetId: number
  ) => Regulation | undefined;
  regulationsOf: (targetId: number) => Regulation[];
  regulationsFrom: (regulatorId: number) => Regulation[];
  clear: () => void;
};

const useRegulationsStore = create<RegulationsState>((set, get) => ({
  regulations: {},

  /** Getter which returns all regulations in the form of array */
  getAllRegulations: () => Object.values(get().regulations),

  addRegulation: (regulation: Regulation) => {
    set((state) => ({
      regulations: {
        ...state.regulations,
        [`${regulation.regulator}-${regulation.target}`]: regulation,
      },
    }));
  },

  removeRegulation: (regulatorId, targetId) => {
    const regulation = get().getRegulationId(regulatorId, targetId);
    if (regulation) {
      const newRegulations = { ...get().regulations };
      delete newRegulations[`${regulatorId}-${targetId}`];
      set({ regulations: newRegulations });
    }
  },

  setObservability: (regulatorId, targetId, isObservable) => {
    const regulationId: string = `${regulatorId}-${targetId}`;
    set((state) => ({
      regulations: {
        ...state.regulations,
        [regulationId]: {
          ...state.regulations[regulationId],
          observable: isObservable,
        },
      },
    }));
  },

  toggleObservability: (regulatorId, targetId) => {
    const regulation = get().getRegulationId(regulatorId, targetId);
    if (regulation) {
      get().setObservability(regulatorId, targetId, !regulation.observable);
    }
  },

  setMonotonicity: (regulatorId, targetId, monotonicity) => {
    const regulationId: string = `${regulatorId}-${targetId}`;
    set((state) => ({
      regulations: {
        ...state.regulations,
        [regulationId]: {
          ...state.regulations[regulationId],
          monotonicity: monotonicity,
        },
      },
    }));
  },

  toggleMonotonicity: (regulatorId, targetId) => {
    const regulation = get().getRegulationId(regulatorId, targetId);
    if (regulation) {
      let next = EdgeMonotonicity.unspecified;
      if (regulation.monotonicity === EdgeMonotonicity.unspecified)
        next = EdgeMonotonicity.activation;
      else if (regulation.monotonicity === EdgeMonotonicity.activation)
        next = EdgeMonotonicity.inhibition;
      get().setMonotonicity(regulatorId, targetId, next);
    }
  },

  getRegulationId: (regulatorId, targetId) =>
    get().regulations[`${regulatorId}-${targetId}`],

  regulationsOf: (targetId) =>
    get()
      .getAllRegulations()
      .filter((r) => r.target === targetId),

  regulationsFrom: (regulatorId) =>
    get()
      .getAllRegulations()
      .filter((r) => r.regulator === regulatorId),

  clear: () => set({ regulations: {} }),
}));

export default useRegulationsStore;
