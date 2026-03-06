import { create } from 'zustand';
import type { UpdateFunction } from '../../../types';
import type { ZustandStore } from '../../ZustandStoreType';
import useVariablesStore from '../VariablesStore/useVariablesStore';
import type { UpdateFunctionsState } from './UpdateFunctionsState';

function createUpdateFunctionsStore(): ZustandStore<UpdateFunctionsState> {
  return create<UpdateFunctionsState>((set, get) => ({
    updateFunctions: {},
    updateFunctionStatus: {},
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

    getUpdateFunctionId: (id) => get().updateFunctions[id],

    deleteUpdateFunctionId: (id) => {
      set((state) => {
        const newUpdateFunctions = { ...state.updateFunctions };
        delete newUpdateFunctions[id];
        return { updateFunctions: newUpdateFunctions };
      });
    },

    getAllUpdateFunctions: () => Object.entries(get().updateFunctions),

    setUpdateFunctionStatus: (id, status) =>
      set((state) => ({
        updateFunctionStatus: { ...state.updateFunctionStatus, [id]: status },
      })),

    errorInUpdateFunctions: () => {
      const statusEntries = Object.entries(get().updateFunctionStatus);
      for (const [id, status] of statusEntries) {
        if (status.isError) return Number(id);
      }
      return undefined;
    },

    resetUpdateFunctionStatus: () => {
      set({ updateFunctionStatus: {} });
    },

    clear: () => set({ updateFunctions: {}, updateFunctionStatus: {} }),
  }));
}

export default createUpdateFunctionsStore;
