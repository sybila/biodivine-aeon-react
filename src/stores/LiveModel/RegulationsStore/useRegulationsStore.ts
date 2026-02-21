import { create } from 'zustand';
import { type Regulation } from '../../../types';
import type { RegulationsStatus } from './RegulationsStatus';

/**
 * Zustand store for regulations.
 * Provides actions for adding, removing, updating, and querying regulations.
 */
const useRegulationsStore = create<RegulationsStatus>((set, get) => ({
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
