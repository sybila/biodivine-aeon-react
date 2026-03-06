import { create } from 'zustand';
import { type Regulation } from '../../../types';
import type { ZustandStore } from '../../ZustandStoreType';
import type { RegulationsStatus } from './RegulationsStatus';

function createRegulationsStore(): ZustandStore<RegulationsStatus> {
  return create<RegulationsStatus>((set, get) => ({
    regulations: {},

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
}

export default createRegulationsStore;
