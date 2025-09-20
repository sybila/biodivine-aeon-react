import { create } from 'zustand';

type AttractorVisualizerStatusState = {
  /** Currently selected node state. It should be string consisting of '0' and '1' */
  selectedNodeState: string | null;
  changeSelectedState: (state: string | null) => void;
  clear: () => void;
};

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
