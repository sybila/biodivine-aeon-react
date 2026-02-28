import { create } from 'zustand';
import type { AttractorVisualizerStatusState } from './AttractorVisualizerStatusState';

/** Zustand store for managing Attractor Visualizer status. */
const useAttractorVisualizerStatus = create<AttractorVisualizerStatusState>()(
  (set) => ({
    selectedNodeState: null,
    changeSelectedState: (state) => {
      set({
        selectedNodeState: state,
      });
    },
    clear: () =>
      set({
        selectedNodeState: null,
      }),
  })
);

export default useAttractorVisualizerStatus;
