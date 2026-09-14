import { create } from 'zustand';
import type { ZustandStore } from '../ZustandStoreType';
import type { HelpHoverState } from './HelpHoverState';

function createHelpHoverStore(): ZustandStore<HelpHoverState> {
  return create<HelpHoverState>()((set) => ({
    position: null,
    isTooltip: false,
    helpText: null,
    setHelpHoverAtElementCenter: (
      event: MouseEvent,
      helpText: string,
      isTooltip: boolean,
      adjustTop?: number,
      adjustLeft?: number
    ) => {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      // Calculate center of the element
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Apply any adjustments
      const x = centerX + window.scrollX + (adjustLeft || 0);
      const y = centerY + window.scrollY + (adjustTop || 0);

      set({
        position: [x, y],
        helpText,
        isTooltip: isTooltip,
      });
    },
    setHelpHoverAtMouse: (
      event: MouseEvent,
      helpText: string,
      isTooltip: boolean,
      adjustTop?: number,
      adjustLeft?: number
    ) => {
      const x = event.clientX + window.scrollX + (adjustLeft || 0);
      const y = event.clientY + window.scrollY + (adjustTop || 0);

      set({
        position: [x, y],
        helpText,
        isTooltip: isTooltip,
      });
    },
    setHelpHoverText: (helpText: string) => set({ helpText }),
    clear: () => set({ position: null, helpText: null, isTooltip: false }),
  }));
}
export default createHelpHoverStore;
