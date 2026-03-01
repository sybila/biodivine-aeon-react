import { create } from 'zustand';
import type { OverlayWindowState } from './OverlayWindowState';

/** Zustand store for managing the content of global content overlay window in the model editor. */
const useOverlayWindowStore = create<OverlayWindowState>()((set) => ({
  currentContent: null,
  setCurrentContent: (content) => set({ currentContent: content }),
  clear: () => set({ currentContent: null }),
}));

export default useOverlayWindowStore;
