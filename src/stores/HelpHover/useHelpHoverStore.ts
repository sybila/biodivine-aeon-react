import { create } from 'zustand';
import type { HelpHoverState } from './HelpHoverState';

/** Zustand store for managing the help hover in the application. */
const useHelpHoverStore = create<HelpHoverState>()((set) => ({
  position: null,
  helpText: null,
  setHelpHover: (
    event: MouseEvent,
    helpText: string,
    adjustTop?: number,
    adjustLeft?: number
  ) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    // Calculate center of the element
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Apply any adjustments
    const x = centerX + (adjustLeft || 0);
    const y = centerY + (adjustTop || 0);

    set({
      position: { x, y },
      helpText,
    });
  },
  clear: () => set({ position: null, helpText: null }),
}));

export default useHelpHoverStore;
