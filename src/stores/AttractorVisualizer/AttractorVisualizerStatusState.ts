import type { MenuTabTypeAVNotNull } from '../../types/pages/attractorVisualizer';
import type { MenuTabButton } from '../../types/types';

/** Zustand store for managing Attractor Visualizer status. */
export type AttractorVisualizerStatusState = {
  /** Currently selected node state. It should be string consisting of '0' and '1' */
  selectedNodeState: string | null;
  changeSelectedState: (state: string | null) => void;
  /** Reference to the menu tab buttons. */
  menuTabButtonsRef: Partial<Record<MenuTabTypeAVNotNull, MenuTabButton>>;

  /** Sets the reference to a menu tab button.
   *  @param tab - The menu tab type.
   *  @param el - The HTML button element, or null to clear the reference.
   */
  setMenuTabButtonRef: (
    tab: MenuTabTypeAVNotNull,
    el: MenuTabButton | null
  ) => void;
  clear: () => void;
};
