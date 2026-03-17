import { create } from 'zustand';
import type { ZustandStore } from '../ZustandStoreType';
import type { UndoRedoState } from './UndoRedoState';

function createUndoRedoStore(): ZustandStore<UndoRedoState> {
  return create<UndoRedoState>((set, get) => ({
    operationStack: [],
    pointer: -1,

    addOperation: (operation) => {
      set((state) => {
        const newStack = state.operationStack.slice(0, state.pointer + 1);
        newStack.push(operation);
        return {
          operationStack: newStack,
          pointer: state.pointer + 1,
        };
      });
    },

    undo: () => {
      const { operationStack, pointer } = get();
      if (pointer >= 0) {
        const operation = operationStack[pointer];

        if (operation) {
          operationStack[pointer].undo();
          set({ pointer: pointer - 1 });
        }
      }
    },

    redo: () => {
      const { operationStack, pointer } = get();
      if (pointer < operationStack.length - 1) {
        const operation = operationStack[pointer + 1];
        if (operation) {
          operationStack[pointer + 1].redo();
          set({ pointer: pointer + 1 });
        }
      }
    },

    clear: () => {
      set({
        operationStack: [],
        pointer: -1,
      });
    },
  }));
}

export default createUndoRedoStore;
