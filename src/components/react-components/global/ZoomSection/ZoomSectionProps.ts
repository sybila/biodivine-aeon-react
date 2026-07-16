export type ZoomSectionProps = {
  setZoomFunction: (zoomLevel: number) => void;

  minValue: number;
  maxValue: number;
  currentValue: number;

  textColor?: string;
  /** Css property defining the size of gap between header and other content. */
  gapInsideSection: string;
};
