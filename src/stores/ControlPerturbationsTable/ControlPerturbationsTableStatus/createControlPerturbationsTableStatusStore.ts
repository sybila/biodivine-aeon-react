import { create } from 'zustand';
import type { ZustandStore } from '../../ZustandStoreType';
import type { ControlPerturbationsTableStatusState } from './ControlPerturbationsTableStatusState';

function createControlPerturbationsTableStatusStore(): ZustandStore<ControlPerturbationsTableStatusState> {
  return create<ControlPerturbationsTableStatusState>((set) => ({
    menuTabButtonsRef: {},
    setMenuTabButtonRef: (tab, el) =>
      set((state) => ({
        menuTabButtonsRef: {
          ...state.menuTabButtonsRef,
          [tab]: el,
        },
      })),
  }));
}

export default createControlPerturbationsTableStatusStore;
