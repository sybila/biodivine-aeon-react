import type { UndoRedoFunctions } from '../../types/types';

/** State for managing undo and redo operationss */
export type UndoRedoState = {
  /** Stack of made operations and their undo functions */
  operationStack: Array<UndoRedoFunctions>;
  /** Pointer where we are in the operation stack. */
  pointer: number;

  /** Function that is responsible for displaying a success message. Should be initialized right after creation of the store object with setMessageFunctions setter function.*/
  showSuccessMessage: (message: string) => void;
  /** Function that is responsible for displaying a error message. Should be initialized right after creation of the store object with setMessageFunctions setter function.*/
  showErrorMessage: (message: string) => void;
  /** Setter function which sets showSuccessMessage and showErrorMessage functions. Should be run right after creation of the store object.*/
  setMessageFunctions: (
    successFun: (message: string) => void,
    errorFun: (message: string) => void
  ) => void;

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
