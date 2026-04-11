export type VisualizationCanvasProps = {
  initialized: boolean;
  setInitialized: (initialized: boolean) => void;
  initializeCanvas: (container: HTMLDivElement) => void;
};
