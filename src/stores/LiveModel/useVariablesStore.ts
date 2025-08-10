import { create } from 'zustand';
import type { Variable } from '../../types';

type VariablesState = {
  variables: Record<number, Variable>;
  nameToId: Record<string, number>;
  addVariable: (variable: Variable) => number;
  removeVariable: (id: number, force?: boolean) => void;
  renameVariable: (id: number, newName: string) => string | undefined;
  getAllVariables: () => Variable[];
  isEmpty: () => boolean;
  getVariableName: (id: number) => string | undefined;
  variableFromId: (id: number) => Variable | undefined;
  variableFromName: (name: string) => Variable | undefined;
  clear: () => void;
};

// Zustand store for managing variables in the LiveModel
// Provides actions for adding, removing, renaming, and querying variables
const useVariablesStore = create<VariablesState>((set, get) => ({
  variables: {},
  nameToId: {},

  addVariable: (variable: Variable) => {
    if (!(variable.id in get().variables)) {
      set((state) => ({
        variables: { ...state.variables, [variable.id]: variable },
        nameToId: { ...state.nameToId, [variable.name]: variable.id },
      }));
    }

    return variable.id;
  },

  removeVariable: (id) => {
    const variable = get().variables[id];
    if (!variable) return;
    set((state) => {
      const newVars = { ...state.variables };
      const newNameToId = { ...state.nameToId };
      delete newVars[id];
      delete newNameToId[variable.name];
      return { variables: newVars, nameToId: newNameToId };
    });
  },

  renameVariable: (id, newName) => {
    const variable = get().variables[id];
    if (!variable) {
      return 'Variable with this ID does not exist.';
    }
    if (newName in get().nameToId) {
      return 'Variable with this name already exists.';
    }
    set((state) => {
      const newVars = {
        ...state.variables,
        [id]: { ...state.variables[id], name: newName },
      };
      const newNameToId = { ...state.nameToId };
      delete newNameToId[variable.name];
      newNameToId[newName] = id;
      return { variables: newVars, nameToId: newNameToId };
    });
  },

  getAllVariables: () => Object.values(get().variables),

  isEmpty: () => Object.keys(get().variables).length === 0,

  getVariableName: (id) => get().variables[id]?.name,

  variableFromId: (id) => get().variables[id],

  variableFromName: (name) => {
    const id = get().nameToId[name];
    return id !== undefined ? get().variables[id] : undefined;
  },

  clear: () => {
    set({ variables: {}, nameToId: {} });
  },
}));

export default useVariablesStore;
