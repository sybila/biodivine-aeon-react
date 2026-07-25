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
        const newPhenotypes = {
          ...state.phenotypes,
          [state.currentPhenotype.id]: state.currentPhenotype,
        };

        Object.keys(newPhenotypes).forEach(
          (phenId: string) => delete newPhenotypes[Number(phenId)].variables[id]
        );

        delete newControlEnabled[id];

        return {
          controlEnabled: newControlEnabled,
          phenotypes: newPhenotypes,
          currentPhenotype: {
            ...newPhenotypes[state.currentPhenotype.id],
            id: state.currentPhenotype.id,
          },
        };
      });
    },

    switchPhenotype: (id: number) => {
      if (get().currentPhenotype.id === id) {
        get().phenotypes[get().currentPhenotype.id] = get().currentPhenotype;
        return id;
      }

      const newPhenotype = get().phenotypes[id];

      if (newPhenotype === undefined) {
        return undefined;
      }

      set({
        currentPhenotype: { ...newPhenotype, id: id },
        phenotypes: {
          ...get().phenotypes,
          [get().currentPhenotype.id]: get().currentPhenotype,
        },
      });

      return id;
    },
    createPhenotype: (name: string) => {
      const [nameExists, highestId] = Object.entries(get().phenotypes).reduce(
        (acc, phenotypeInfo) => {
          const id = Number(phenotypeInfo[0]);

          return [
            acc[0] || phenotypeInfo[1].name === name,
            id > acc[1] ? id : acc[1],
          ];
        },
        [false, 0]
      );

      if (nameExists) {
        return undefined;
      }

      const newPhenotypeId = highestId + 1;
      const newPhenotype = { id: newPhenotypeId, name: name, variables: {} };

      set({
        phenotypes: {
          ...get().phenotypes,
          [get().currentPhenotype.id]: get().currentPhenotype,
          [newPhenotypeId]: newPhenotype,
        },
        currentPhenotype: newPhenotype,
      });

      return newPhenotypeId;
    },
    removePhenotype: (id: number) => {
      if (id < 0) {
        return undefined;
      }

      set(() => {
        const isCurrentPhenotype = get().currentPhenotype.id === id;
        const newPhenotypes = { ...get().phenotypes };

        delete newPhenotypes[id];

        if (isCurrentPhenotype) {
          return {
            phenotypes: newPhenotypes,
            currentPhenotype: { ...newPhenotypes[-1], id: -1 },
          };
        }

        return { phenotypes: newPhenotypes };
      });

      return 0;
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
