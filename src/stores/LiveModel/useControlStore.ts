import { create } from 'zustand';
import type { ControlInfo, Phenotype } from '../../types';

type ControlState = {
  /** Property containing control information for each variable. */
  controlInfo: Record<number, ControlInfo>;
  /** Adds control information for a variable. */
  addInfo: (id: number, controlInfo: ControlInfo) => number;
  /** Removes control information for a variable. */
  removeInfo: (id: number) => void;
  /** Retrieves all control information. */
  getAllInfo: () => ControlInfo[];
  /** Sets the control enabled state for a variable. */
  setControlEnabled: (id: number, controlEnabled: boolean) => void;
  /** Sets the phenotype for a variable. */
  setPhenotype: (id: number, phenotype: Phenotype) => void;
  /** Retrieves control information for a specific variable by ID. */
  getVariableControlInfo: (id: number) => ControlInfo | undefined;
  /** Retrieves IDs of variables based on their control enabled state. */
  getControlEnabledIds: (controlEnabled: boolean) => number[];
  /** Retrieves IDs of variables based on their phenotype state. */
  getPhenotypeIds: (phenotype: Phenotype) => number[];
  /** Checks if the control information is empty. */
  isEmpty: () => boolean;
  /** Clears all control information. */
  clear: () => void;
};

/** Zustand store for managing control information of variables in LiveModel
 Provides actions for adding, removing, updating, and querying control info and phenotypes */
const useControlStore = create<ControlState>((set, get) => ({
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

export default useControlStore;
