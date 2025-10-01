import { create } from 'zustand';
import type { TextButton, Warning } from '../../types';

type WarningState = {
  /** Head of the linked list of warnings. If null, there are no warnings. */
  warningLinkedList: Warning | null;
  /** Adds a new warning to the linked list. */
  addWarning: (message: string, buttons: TextButton[]) => void;
  /** Removes the head warning from the linked list and returns it. */
  popWarning: () => Warning | null;
  /** Clears all warnings from the linked list. */
  clear: () => void;
};

/** Store for managing warnings in the application */
const useWarningStore = create<WarningState>((set, get) => ({
  warningLinkedList: null,

  addWarning: (message: string, buttons: TextButton[]) => {
    const currentWarnings = get().warningLinkedList;
    set({
      warningLinkedList: { message, buttons, nextWarning: currentWarnings },
    });
  },

  popWarning: () => {
    const currentWarnings = get().warningLinkedList;
    if (currentWarnings) {
      set({ warningLinkedList: currentWarnings.nextWarning });
    }

    return currentWarnings;
  },

  clear: () => {
    set({ warningLinkedList: null });
  },
}));

export default useWarningStore;
