export type AttractorVisualizerStatusState = {
  /** Currently selected node state. It should be string consisting of '0' and '1' */
  selectedNodeState: string | null;
  changeSelectedState: (state: string | null) => void;
  clear: () => void;
};
