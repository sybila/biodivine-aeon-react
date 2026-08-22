import { create } from 'zustand';
import { err, ok } from '../../../types/result';
import { PHENOTYPE_STATUS, type PhenotypeStatus } from '../../../types/types';
import type { ZustandStore } from '../../ZustandStoreType';
import type { ControlStatus } from './ControlStatus';

function createControlStore(): ZustandStore<ControlStatus> {
  return create<ControlStatus>((set, get) => ({
    // #region --- Props ---

    controlEnabled: {},

    currentlyEditedPhenotype: {
      id: -1,
      name: 'Default Phenotype',
      variables: {},
    },
    phenotypesUsedInComputation: new Set([-1]),
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
          currentlyEditedPhenotype: {
            ...state.currentlyEditedPhenotype,
            variables: {
              ...state.currentlyEditedPhenotype.variables,
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
          [state.currentlyEditedPhenotype.id]: state.currentlyEditedPhenotype,
        };

        Object.keys(newPhenotypes).forEach(
          (phenId: string) => delete newPhenotypes[Number(phenId)].variables[id]
        );

        delete newControlEnabled[id];

        return {
          controlEnabled: newControlEnabled,
          phenotypes: newPhenotypes,
          currentlyEditedPhenotype: {
            ...newPhenotypes[state.currentlyEditedPhenotype.id],
            id: state.currentlyEditedPhenotype.id,
          },
        };
      });
    },

    getVariableControlInfo: (id) => {
      const controlEnabledStatus = get().getVariableControlEnabled(id);
      const phenotypeStatus = get().getVariablePhenotype(id);

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
      if (get().currentlyEditedPhenotype.id === id) {
        get().phenotypes[get().currentlyEditedPhenotype.id] =
          get().currentlyEditedPhenotype;
        return id;
      }

      const newPhenotype = get().phenotypes[id];

      if (newPhenotype === undefined) {
        return undefined;
      }

      set({
        currentlyEditedPhenotype: { ...newPhenotype, id: id },
        phenotypes: {
          ...get().phenotypes,
          [get().currentlyEditedPhenotype.id]: get().currentlyEditedPhenotype,
        },
      });

      return id;
    },
    createPhenotype: (name?: string, id?: number) => {
      let currentName = name;
      let newPhenotypeCounterValue = undefined;

      if (!currentName) {
        const newPhenInfo = get().getNewPhenotypeName();

        currentName = newPhenInfo.name;
        newPhenotypeCounterValue = newPhenInfo.newCounterValue;
      }

      const [nameExists, highestId, idExists] = Object.entries(
        get().phenotypes
      ).reduce(
        (acc, phenotypeInfo) => {
          const phenId = Number(phenotypeInfo[0]);

          return [
            acc[0] || phenotypeInfo[1].name === currentName,
            phenId > acc[1] ? phenId : acc[1],
            acc[2] || phenId === id,
          ];
        },
        [false, 0, false]
      );

      if (nameExists) {
        return err('Phenotype with this name already exists.');
      }

      if (id && idExists) {
        return name != get().phenotypes[id].name
          ? err('Phenotype with this id already exists.')
          : ok(id);
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
          [get().currentlyEditedPhenotype.id]: get().currentlyEditedPhenotype,
          [newPhenotypeId]: newPhenotype,
        },
        currentlyEditedPhenotype: newPhenotype,
      };

      if (!newNoNamePhenNumber) {
        newState.noNamePhenotypeCounter = newPhenotypeCounterValue;
      }

      set(newState);

      return ok(newPhenotypeId);
    },
    removePhenotype: (id: number) => {
      if (id < 0) {
        return err('Cannot delete Default Phenotype.');
      }

      set(() => {
        const isCurrentPhenotype = get().currentlyEditedPhenotype.id === id;
        const newPhenotypes = { ...get().phenotypes };

        delete newPhenotypes[id];

        if (isCurrentPhenotype) {
          return {
            phenotypes: newPhenotypes,
            currentlyEditedPhenotype: { ...newPhenotypes[-1], id: -1 },
          };
        }

        return { phenotypes: newPhenotypes };
      });

      return ok(id);
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

      const currentPhenotype = get().currentlyEditedPhenotype;
      const newState: Partial<ControlStatus> = {};

      if (currentPhenotype.id === id) {
        newState.currentlyEditedPhenotype = {
          ...currentPhenotype,
          name: newName,
        };
        newState.phenotypes = {
          ...phenotypes,
          [currentPhenotype.id]: newState.currentlyEditedPhenotype,
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

    includePhenotypeInComp(id: number) {
      const phen = get().phenotypes[id];

      if (phen === undefined) {
        return err("Phenotype with this Id doesn't exist.");
      }

      set((state) => {
        const newPhenComp = new Set(state.phenotypesUsedInComputation);
        newPhenComp.add(id);
        return { phenotypesUsedInComputation: newPhenComp };
      });

      return ok(id);
    },

    removePhenotypeFromComp(id: number) {
      set((state) => {
        const newPhenComp = new Set(state.phenotypesUsedInComputation);
        newPhenComp.delete(id);
        return { phenotypesUsedInComputation: newPhenComp };
      });

      return ok(id);
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

      if (this.currentlyEditedPhenotype.id === fromId) {
        result.currentlyEditedPhenotype = { ...newFrom, id: fromId };
      } else if (this.currentlyEditedPhenotype.id === toId) {
        result.currentlyEditedPhenotype = { ...newTo, id: toId };
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

    getAllPhenotypes() {
      return {
        ...this.phenotypes,
        [this.currentlyEditedPhenotype.id]: this.currentlyEditedPhenotype,
      };
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

    // #region --- Phenotype Operations ---

    getAllCurrentPhenotype: () => {
      return Object.values(get().currentlyEditedPhenotype.variables);
    },

    getAllCurrentPhenotypeIds: () =>
      Object.entries(get().currentlyEditedPhenotype.variables).map(
        ([id, phenotype]) => [Number(id), phenotype]
      ),

    setPhenotype: (id, phenotypeStatus, phenotypeId) => {
      if (
        phenotypeId != undefined &&
        phenotypeId != get().currentlyEditedPhenotype.id
      ) {
        const phenotype = get().phenotypes[phenotypeId];

        if (!phenotype) return err("Phenotype with this Id doesn't exist.");

        set((state) => {
          return {
            phenotypes: {
              ...state.phenotypes,
              [phenotypeId]: {
                ...phenotype,
                variables: { ...phenotype.variables, [id]: phenotypeStatus },
              },
            },
          };
        });
      } else {
        set((state) => {
          const currentPhenotypeStatus =
            state.currentlyEditedPhenotype.variables[id];
          if (
            currentPhenotypeStatus != undefined ||
            currentPhenotypeStatus == null
          ) {
            return {
              currentlyEditedPhenotype: {
                ...state.currentlyEditedPhenotype,
                variables: {
                  ...state.currentlyEditedPhenotype.variables,
                  [id]: phenotypeStatus,
                },
              },
            };
          }
          return state;
        });
      }

      return ok(id);
    },

    getVariablePhenotype: (id, phenotypeId) => {
      let phenotypeStatus: PhenotypeStatus | undefined;

      if (!phenotypeId) {
        phenotypeStatus = get().currentlyEditedPhenotype.variables[id];
      } else {
        const phenotype = get().phenotypes[phenotypeId];
        phenotypeStatus = phenotype?.variables[id] ?? undefined;
      }

      return phenotypeStatus;
    },

    getPhenotypeIds: (phenotype) => {
      return Object.entries(get().currentlyEditedPhenotype.variables)
        .filter(([, phenotypeStatus]) => phenotypeStatus === phenotype)
        .map(([id]) => Number(id));
    },

    getPhenotypeStats: () => {
      const stats = {
        inPhenotypeTrue: 0,
        inPhenotypeFalse: 0,
        notInPhenotype: 0,
      };

      Object.values(get().currentlyEditedPhenotype.variables).forEach(
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
      Object.keys(get().currentlyEditedPhenotype.variables).length === 0,

    clear: () => {
      set({
        controlEnabled: {},
        currentlyEditedPhenotype: {
          id: -1,
          name: 'Default Phenotype',
          variables: {},
        },
        phenotypesUsedInComputation: new Set([-1]),
        phenotypes: { [-1]: { name: 'Default Phenotype', variables: {} } },
        noNamePhenotypeCounter: 0,
      });
    },
  }));
}

export default createControlStore;
