import { create } from 'zustand';
import type { ZustandStore } from '../../ZustandStoreType';
import type { ControlStatus } from './ControlStatus';

function createControlStore(): ZustandStore<ControlStatus> {
  return create<ControlStatus>((set, get) => ({
    controlInfo: {},

    addInfo: (id, controlInfo) => {
      set((state) => ({
        controlInfo: { ...state.controlInfo, [id]: controlInfo },
      }));
      return id;
    },

    removeInfo: (id) => {
      set((state) => {
        const newControlInfo = { ...state.controlInfo };
        delete newControlInfo[id];
        return { controlInfo: newControlInfo };
      });
    },

    getAllInfo: () => Object.values(get().controlInfo),

    getAllInfoIds: () =>
      Object.entries(get().controlInfo).map(([id, controlInfo]) => [
        Number(id),
        controlInfo,
      ]),

    setControlEnabled: (id, controlEnabled) => {
      set((state) => {
        const controlInfo = state.controlInfo[id];
        if (controlInfo) {
          return {
            controlInfo: {
              ...state.controlInfo,
              [id]: { ...controlInfo, controlEnabled },
            },
          };
        }
        return state;
      });
    },

    setPhenotype: (id, phenotype) => {
      set((state) => {
        const controlInfo = state.controlInfo[id];
        if (controlInfo) {
          return {
            controlInfo: {
              ...state.controlInfo,
              [id]: { ...controlInfo, phenotype },
            },
          };
        }
        return state;
      });
    },

    getVariableControlInfo: (id) => {
      return get().controlInfo[id];
    },

    getControlEnabledIds: (controlEnabled) => {
      return Object.entries(get().controlInfo)
        .filter(([, info]) => info.controlEnabled === controlEnabled)
        .map(([id]) => Number(id));
    },

    getPhenotypeIds: (phenotype) => {
      return Object.entries(get().controlInfo)
        .filter(([, info]) => info.phenotype === phenotype)
        .map(([id]) => Number(id));
    },

    isEmpty: () => Object.keys(get().controlInfo).length === 0,

    clear: () => {
      set({ controlInfo: {} });
    },
  }));
}

export default createControlStore;
