import type { UndoRedoFunctions } from '../../types';

/** State for managing undo and redo operationss */
export type UndoRedoState = {
  /** Stack of made operations and their undo functions */
  operationStack: Array<UndoRedoFunctions>;
  /** Pointer where we are in the operation stack. */
  pointer: number;

  /** Function which adds an operation to the stack.
   *  If the pointer is not at the end of the stack, it should remove all operations after the pointer before adding the new operation.
   */
  addOperation: (operation: UndoRedoFunctions) => void;
  /** Moves the pointer back in the operation stack and executes the corresponding undo function. */
  undo: () => void;
  /** Moves the pointer forward in the operation stack and executes the corresponding redo function. */
  redo: () => void;
  /** Clears the operation stack and resets the pointer. */
  clear: () => void;
};
