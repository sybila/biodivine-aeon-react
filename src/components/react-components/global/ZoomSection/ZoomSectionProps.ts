export type ZoomSectionProps = {
  setZoomFunction: (zoomLevel: number) => void;

  minValue: number;
  maxValue: number;
  currentValue: number;

  textColor?: string;
  thumbColor?: string;
  bgColor?: string;
  /** Css property defining the size of gap between header and other content. */
  gapInsideSection: string;
};
