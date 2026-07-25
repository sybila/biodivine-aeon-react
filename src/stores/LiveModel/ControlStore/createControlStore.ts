import { create } from 'zustand';
import { PHENOTYPE_STATUS } from '../../../types';
import type { ZustandStore } from '../../ZustandStoreType';
import type { ControlStatus } from './ControlStatus';

function createControlStore(): ZustandStore<ControlStatus> {
  return create<ControlStatus>((set, get) => ({
    controlEnabled: {},

    currentPhenotype: { id: -1, name: 'Default Phenotype', variables: {} },
    phenotypes: { [-1]: { name: 'Default Phenotype', variables: {} } },

    addInfo: (id, controlInfo) => {
      set((state) => {
        return {
          controlEnabled: {
            ...state.controlEnabled,
            [id]: controlInfo.controlEnabled,
          },
          currentPhenotype: {
            ...state.currentPhenotype,
            variables: {
              ...state.currentPhenotype.variables,
              [id]: controlInfo.phenotype,
            },
          },
        };
      });
      return id;
    },

    removeInfo: (id) => {
      set((state) => {
        const newControlEnabled = { ...state.controlEnabled };
        const newCurrentPhenotype = {
          ...state.currentPhenotype,
        };
        delete newControlEnabled[id];
        delete newCurrentPhenotype.variables[id];
        return {
          controlEnabled: newControlEnabled,
          currentPhenotype: newCurrentPhenotype,
        };
      });
    },

    getAllControlEnabled: () => {
      return Object.values(get().controlEnabled);
    },

    getAllControlEnabledIds: () =>
      Object.entries(get().controlEnabled).map(([id, controlEnabled]) => [
        Number(id),
        controlEnabled,
      ]),

    setControlEnabled: (id, controlEnabled) => {
      set((state) => {
        const controlEnabledStatus = state.controlEnabled[id];
        if (controlEnabledStatus != undefined) {
          return {
            controlEnabled: {
              ...state.controlEnabled,
              [id]: controlEnabled,
            },
          };
        }
        return state;
      });
    },

    getAllCurrentPhenotype: () => {
      return Object.values(get().currentPhenotype.variables);
    },

    getAllCurrentPhenotypeIds: () =>
      Object.entries(get().currentPhenotype.variables).map(
        ([id, phenotype]) => [Number(id), phenotype]
      ),

    setPhenotype: (id, phenotype) => {
      set((state) => {
        const currentPhenotypeStatus = state.currentPhenotype.variables[id];
        if (
          currentPhenotypeStatus != undefined ||
          currentPhenotypeStatus == null
        ) {
          return {
            currentPhenotype: {
              ...state.currentPhenotype,
              variables: {
                ...state.currentPhenotype.variables,
                [id]: phenotype,
              },
            },
          };
        }
        return state;
      });
    },

    getVariableControlInfo: (id) => {
      const controlEnabledStatus = get().getVariableControlEnabled(id);
      const phenotypeStatus = get().getVariableCurrentPhenotype(id);

      if (controlEnabledStatus === undefined && phenotypeStatus === undefined) {
        return undefined;
      }

      return {
        controlEnabled: controlEnabledStatus ?? true,
        phenotype: phenotypeStatus ?? PHENOTYPE_STATUS.NotInPhenotype,
      };
    },

    getVariableControlEnabled: (id) => {
      return get().controlEnabled[id];
    },

    getVariableCurrentPhenotype: (id) => {
      const phenotype = get().currentPhenotype.variables[id];

      return phenotype === undefined ? undefined : phenotype;
    },

    getControlEnabledIds: (controlEnabled) => {
      return Object.entries(get().controlEnabled)
        .filter(([, isControlEnabled]) => isControlEnabled === controlEnabled)
        .map(([id]) => Number(id));
    },

    getPhenotypeIds: (phenotype) => {
      return Object.entries(get().currentPhenotype.variables)
        .filter(([, phenotypeStatus]) => phenotypeStatus === phenotype)
        .map(([id]) => Number(id));
    },

    isEmpty: () =>
      Object.keys(get().controlEnabled).length === 0 &&
      Object.keys(get().currentPhenotype.variables).length === 0,

    clear: () => {
      set({
        controlEnabled: {},
        currentPhenotype: { id: -1, name: 'Default Phenotype', variables: {} },
        phenotypes: { [-1]: { name: 'Default Phenotype', variables: {} } },
      });
    },
  }));
}

export default createControlStore;
