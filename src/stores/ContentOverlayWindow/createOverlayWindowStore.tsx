import { create } from 'zustand';
import type { ZustandStore } from '../ZustandStoreType';
import type { OverlayWindowState } from './OverlayWindowState';

function createOverlayWindowStore(): ZustandStore<OverlayWindowState> {
  return create<OverlayWindowState>()((set) => ({
    currentContent: null,
    setCurrentContent: (content) => set({ currentContent: content }),
    clear: () => set({ currentContent: null }),
  }));
}

export default createOverlayWindowStore;
