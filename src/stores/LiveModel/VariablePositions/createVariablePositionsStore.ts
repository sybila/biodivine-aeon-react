import { create } from 'zustand';
import type { ZustandStore } from '../../ZustandStoreType';
import type { VariablePositionsState } from './VariablePostionsState';

function createVariablePositionsStore(): ZustandStore<VariablePositionsState> {
  return create<VariablePositionsState>((set) => ({
    variablePositions: {},

    setVariablePosition: (variableId, position) => {
      set((state) => ({
        variablePositions: {
          ...state.variablePositions,
          [variableId]: position,
        },
      }));
    },

    removeVariablePosition: (variableId) => {
      set((state) => {
        const newPositions = { ...state.variablePositions };
        delete newPositions[variableId];
        return { variablePositions: newPositions };
      });
    },

    setPositionOfAllVariables: (positions) => {
      set({ variablePositions: positions });
    },

    clear: () => set({ variablePositions: {} }),
  }));
}

export default createVariablePositionsStore;
