import { create } from 'zustand';
import type { TextButton } from '../../types';
import type { ZustandStore } from '../ZustandStoreType';
import type { WarningState } from './WarningState';

function createWarningStore(): ZustandStore<WarningState> {
  return create<WarningState>((set, get) => ({
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
}

export default createWarningStore;
