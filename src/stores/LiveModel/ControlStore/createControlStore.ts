import { create } from 'zustand';
import { err, ok, PHENOTYPE_STATUS } from '../../../types';
import type { ZustandStore } from '../../ZustandStoreType';
import type { ControlStatus } from './ControlStatus';

function createControlStore(): ZustandStore<ControlStatus> {
  return create<ControlStatus>((set, get) => ({
    // #region --- Props ---

    controlEnabled: {},

    currentPhenotype: { id: -1, name: 'Default Phenotype', variables: {} },

    phenotypes: { [-1]: { name: 'Default Phenotype', variables: {} } },

    noNamePhenotypeCounter: 0,
    noNamePhenotypePrefix: 'p_',

    // #endregion

    // #region --- Variable Control-Info (Control-Enabled + Phenotype) ---

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

    getNumberOfSetControl: () => {
      const controlEnabled = get().getControlEnabledStats().controlEnabled;
      const phenotypeStats = get().getPhenotypeStats();

      const inPhenotype =
        phenotypeStats.inPhenotypeTrue + phenotypeStats.inPhenotypeFalse;

      return [controlEnabled, inPhenotype];
    },

    // #endregion

    // #region --- Multiple Phenotype Operations ---

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
    createPhenotype: (name?: string) => {
      let currentName = name;
      let newPhenotypeCounterValue = undefined;

      if (!currentName) {
        const newPhenInfo = get().getNewPhenotypeName();

        currentName = newPhenInfo.name;
        newPhenotypeCounterValue = newPhenInfo.newCounterValue;
      }

      const [nameExists, highestId] = Object.entries(get().phenotypes).reduce(
        (acc, phenotypeInfo) => {
          const id = Number(phenotypeInfo[0]);

          return [
            acc[0] || phenotypeInfo[1].name === currentName,
            id > acc[1] ? id : acc[1],
          ];
        },
        [false, 0]
      );

      if (nameExists) {
        return err('Phenotype with this name already exists.');
      }

      const newNoNamePhenNumber = !name
        ? get().checkNoNamePhenotype(currentName)
        : undefined;

      const newPhenotypeId = highestId + 1;
      const newPhenotype = {
        id: newPhenotypeId,
        name: currentName,
        variables: {},
      };

      const newState: Partial<ControlStatus> = {
        phenotypes: {
          ...get().phenotypes,
          [get().currentPhenotype.id]: get().currentPhenotype,
          [newPhenotypeId]: newPhenotype,
        },
        currentPhenotype: newPhenotype,
      };

      if (!newNoNamePhenNumber) {
        newState.noNamePhenotypeCounter = newPhenotypeCounterValue;
      }

      set(newState);

      return ok(newPhenotypeId);
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
    renamePhenotype: (id: number, newName: string) => {
      const phenotypes = get().phenotypes;
      const renamePhenotype = phenotypes[id];

      if (!renamePhenotype) {
        return err("This phenotype doesn't exist.");
      }

      const phenWithSameName = get().getPhenotypeByName(newName);

      if (phenWithSameName && phenWithSameName.id != id) {
        return err('Phenotype with this name already exists.');
      }

      const currentPhenotype = get().currentPhenotype;
      const newState: Partial<ControlStatus> = {};

      if (currentPhenotype.id === id) {
        newState.currentPhenotype = { ...currentPhenotype, name: newName };
        newState.phenotypes = {
          ...phenotypes,
          [currentPhenotype.id]: newState.currentPhenotype,
        };
      } else {
        newState.phenotypes = {
          ...phenotypes,
          [id]: { ...renamePhenotype, name: newName },
        };
      }

      set(newState);

      return ok(newName);
    },

    shiftPhenotype(fromId: number, toId: number) {
      const fromPhen = this.phenotypes[fromId];
      const toPhen = this.phenotypes[toId];

      const result: Partial<ControlStatus> = {};

      if (!fromPhen) {
        return err("Phenotype specified as source doesn't exist.");
      }

      if (!toPhen) {
        return err("Phenotype specified as goal doesn't exist.");
      }

      const newTo = { ...toPhen, variables: fromPhen.variables };
      const newFrom = { ...fromPhen, variables: {} };

      if (this.currentPhenotype.id === fromId) {
        result.currentPhenotype = { ...newFrom, id: fromId };
      } else if (this.currentPhenotype.id === toId) {
        result.currentPhenotype = { ...newTo, id: toId };
      }

      result.phenotypes = {
        ...this.phenotypes,
        [fromId]: newFrom,
        [toId]: newTo,
      };

      set(result);

      return ok(toId);
    },

    getPhenotypeByName(name) {
      const phenotypes = get().phenotypes;

      const phenWithName = Object.entries(phenotypes).find(
        (phen) => phen[1].name === name
      );

      return phenWithName === undefined
        ? undefined
        : { ...phenWithName[1], id: Number(phenWithName[0]) };
    },

    getNewPhenotypeName(): { name: string; newCounterValue: number } {
      const name = get().noNamePhenotypePrefix + get().noNamePhenotypeCounter;

      return { name: name, newCounterValue: get().noNamePhenotypeCounter + 1 };
    },

    checkNoNamePhenotype(name: string): number | undefined {
      if (name != undefined && name.startsWith(get().noNamePhenotypePrefix)) {
        const phenotypeNumberStr = name.slice(
          get().noNamePhenotypePrefix.length
        );

        if (/^\d+$/.test(phenotypeNumberStr)) {
          const phenotypeNumber = Number(phenotypeNumberStr);

          if (get().noNamePhenotypeCounter < phenotypeNumber) {
            return phenotypeNumber + 1;
          }
        }
      }

      return undefined;
    },

    // #endregion

    // #region --- Control-Enabled Variable Operations ---

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

    getVariableControlEnabled: (id) => {
      return get().controlEnabled[id];
    },

    getControlEnabledIds: (controlEnabled) => {
      return Object.entries(get().controlEnabled)
        .filter(([, isControlEnabled]) => isControlEnabled === controlEnabled)
        .map(([id]) => Number(id));
    },

    getControlEnabledStats: () => {
      const stats = {
        controlEnabled: 0,
        notControlEnabled: 0,
      };

      Object.values(get().controlEnabled).forEach((variableControlEnabled) => {
        if (variableControlEnabled) stats.controlEnabled++;
        else stats.notControlEnabled++;
      });

      return stats;
    },

    // #endregion

    // #region --- Current Phenotype Operations ---

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

    getVariableCurrentPhenotype: (id) => {
      const phenotype = get().currentPhenotype.variables[id];

      return phenotype === undefined ? undefined : phenotype;
    },

    getPhenotypeIds: (phenotype) => {
      return Object.entries(get().currentPhenotype.variables)
        .filter(([, phenotypeStatus]) => phenotypeStatus === phenotype)
        .map(([id]) => Number(id));
    },

    getPhenotypeStats: () => {
      const stats = {
        inPhenotypeTrue: 0,
        inPhenotypeFalse: 0,
        notInPhenotype: 0,
      };

      Object.values(get().currentPhenotype.variables).forEach(
        (phenotypeStatus) => {
          switch (phenotypeStatus) {
            case PHENOTYPE_STATUS.InPhenotypeTrue: {
              stats.inPhenotypeTrue++;
              break;
            }
            case PHENOTYPE_STATUS.InPhenotypeFalse: {
              stats.inPhenotypeFalse++;
              break;
            }
            default: {
              stats.notInPhenotype++;
            }
          }
        }
      );

      return stats;
    },

    // #endregion

    isEmpty: () =>
      Object.keys(get().controlEnabled).length === 0 &&
      Object.keys(get().currentPhenotype.variables).length === 0,

    clear: () => {
      set({
        controlEnabled: {},
        currentPhenotype: { id: -1, name: 'Default Phenotype', variables: {} },
        phenotypes: { [-1]: { name: 'Default Phenotype', variables: {} } },
        noNamePhenotypeCounter: 0,
      });
    },
  }));
}

export default createControlStore;
