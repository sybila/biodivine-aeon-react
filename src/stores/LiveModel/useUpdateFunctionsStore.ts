import { create } from 'zustand';
import type { UpdateFunction, UpdateFunctionStatus } from '../../types';
import useVariablesStore from './useVariablesStore';

/**
 * Zustand store for update functions.
 * Provides actions for setting, deleting, validating, and checking update functions.
 */
type UpdateFunctionsState = {
  updateFunctions: Record<number, UpdateFunction>;
  updateFunctionStatus: Record<number, UpdateFunctionStatus>;
  setUpdateFunction: (
    id: number,
    updateFunction: UpdateFunction
  ) => string | undefined;
  getUpdateFunctionId: (id: number) => UpdateFunction | undefined;
  deleteUpdateFunctionId: (id: number) => undefined;
  getAllUpdateFunctions: () => [string, UpdateFunction][];
  errorInUpdateFunctions: () => number | undefined;
  setUpdateFunctionStatus: (id: number, status: UpdateFunctionStatus) => void;
  resetUpdateFunctionStatus: () => void;
  clear: () => void;
};

const useUpdateFunctionsStore = create<UpdateFunctionsState>((set, get) => ({
  updateFunctions: {},
  /** Validation status for each update function. */
  updateFunctionStatus: {},

  /**
   * Set or update the update function for a variable.
   * If functionString is empty, deletes the update function.
   * Returns undefined on success, or an error string.
   */
  setUpdateFunction: (id, updateFunction: UpdateFunction) => {
    const variable = useVariablesStore.getState().variableFromId(id);
    if (!variable) {
      return `Unknown variable '${id}'.`;
    }

    set((state) => {
      const newUpdateFunctions = { ...state.updateFunctions };
      if (updateFunction.functionString.length === 0) {
        delete newUpdateFunctions[id];
      } else {
        newUpdateFunctions[id] = {
          functionString: updateFunction.functionString.replace(/\s+/, ' '),
          metadata: updateFunction.metadata,
        };
      }
      return { updateFunctions: newUpdateFunctions };
    });
  },

  /**
   * Get the update function for a variable by id.
   */
  getUpdateFunctionId: (id) => get().updateFunctions[id],

  /**
   * Delete the update function for a variable by id.
   */
  deleteUpdateFunctionId: (id) => {
    set((state) => {
      const newUpdateFunctions = { ...state.updateFunctions };
      delete newUpdateFunctions[id];
      return { updateFunctions: newUpdateFunctions };
    });
  },

  /**
   * Get all update functions.
   */
  getAllUpdateFunctions: () => Object.entries(get().updateFunctions),

  /** Set the validation status for a variable's update function. */
  setUpdateFunctionStatus: (id, status) =>
    set((state) => ({
      updateFunctionStatus: { ...state.updateFunctionStatus, [id]: status },
    })),

  /** Get the id of the first variable where update function has an error, or undefined if there is no such variable. */
  errorInUpdateFunctions: () => {
    const statusEntries = Object.entries(get().updateFunctionStatus);
    for (const [id, status] of statusEntries) {
      if (status.isError) return Number(id);
    }
    return undefined;
  },

  /**
   * Reset the validation status of all update functions.
   */
  resetUpdateFunctionStatus: () => {
    set({ updateFunctionStatus: {} });
  },

  /**
   * Remove all update functions.
   */
  clear: () => set({ updateFunctions: {}, updateFunctionStatus: {} }),
}));

export default useUpdateFunctionsStore;
