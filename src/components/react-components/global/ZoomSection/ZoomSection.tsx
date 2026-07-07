import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import ValueSliderReact from '../../lit-wrappers/ValueSliderReact';
import type { ZoomSectionProps } from './ZoomSectionProps';

const ZoomSection: React.FC<ZoomSectionProps> = ({
  setZoomFunction,
  minValue,
  maxValue,
  currentValue,
  gapInsideSection,
}) => {
  return (
    <section
      className="flex flex-col h-fit w-full"
      style={{ gap: `${gapInsideSection}` }}
    >
      <DotHeaderReact headerText="Zoom" compHeight="20px" />

      <ValueSliderReact
        handleInput={(zoomLevel: number) => setZoomFunction(zoomLevel)}
        compWidth="100%"
        step={0.1}
        minValue={minValue}
        maxValue={maxValue}
        value={currentValue}
      />
    </section>
  );
};

export default ZoomSection;
