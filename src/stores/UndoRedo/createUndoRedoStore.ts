import { create } from 'zustand';
import { isErr, type Result } from '../../types/result';
import type { UndoRedoFunctions } from '../../types/types';
import type { ZustandStore } from '../ZustandStoreType';
import type { UndoRedoState } from './UndoRedoState';

function showMessageFromRes(
  result: Result<boolean>,
  operation: UndoRedoFunctions,
  isUndo: boolean,
  showSuccessMessage: (message: string) => void,
  showErrorMessage: (message: string) => void
): void {
  const prefix = isUndo ? 'Undo' : 'Redo';

  if (isErr(result)) {
    showErrorMessage(
      `${prefix} failed: ${isUndo ? operation.onUndoFailErrorPrefix : operation.onRedoFailErrorPrefix}: ${result.error}`
    );
  } else if (!result.value) {
    showErrorMessage(
      `${prefix} failed: ${isUndo ? operation.onUndoFailErrorPrefix : operation.onRedoFailErrorPrefix}.`
    );
  } else {
    showSuccessMessage(
      `${prefix} success: ${isUndo ? operation.onUndoSuccess : operation.onRedoSuccess}`
    );
  }
}

function createUndoRedoStore(): ZustandStore<UndoRedoState> {
  return create<UndoRedoState>((set, get) => ({
    operationStack: [],
    pointer: -1,

    showSuccessMessage: () =>
      console.warn(
        'The `showSuccessMessage` function in `undoRedoStore` has not been set. Please ensure this function is correctly defined and registered.'
      ),
    showErrorMessage: () =>
      console.warn(
        'The `showErrorMessage` function in `undoRedoStore` has not been set. Please ensure this function is correctly defined and registered.'
      ),

    setMessageFunctions: (successFun, errorFun) => {
      set({
        showSuccessMessage: successFun,
        showErrorMessage: errorFun,
      });
    },

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

      if (pointer < 1) {
        return;
      }

      const operation = operationStack[pointer];

      if (!operation) {
        return;
      }

      const res = operationStack[pointer].undo();

      if (!isErr(res) && res.value) {
        set({ pointer: pointer - 1 });
      }

      showMessageFromRes(
        res,
        operation,
        true,
        get().showSuccessMessage,
        get().showErrorMessage
      );
    },

    redo: () => {
      const { operationStack, pointer } = get();

      if (pointer >= operationStack.length - 1) {
        return;
      }

      const operation = operationStack[pointer + 1];

      if (!operation) {
        return;
      }

      const res = operationStack[pointer + 1].redo();

      if (!isErr(res) && res.value) {
        set({ pointer: pointer + 1 });
      }

      showMessageFromRes(
        res,
        operation,
        false,
        get().showSuccessMessage,
        get().showErrorMessage
      );
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
