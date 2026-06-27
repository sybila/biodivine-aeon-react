export type ZoomSectionProps = {
  setZoomFunction: (zoomLevel: number) => void;

  minValue: number;
  maxValue: number;
  currentValue: number;

  /** Css property defining the size of gap between header and other content. */
  gapInsideSection: string;
};
