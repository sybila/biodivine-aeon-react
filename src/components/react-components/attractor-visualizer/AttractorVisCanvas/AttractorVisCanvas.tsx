import { useEffect, useRef, useState } from 'react';
import type { AttractorVisCanvasProps } from './AttractorVisCanvasProps';

const AttractorVisCanvas: React.FC<AttractorVisCanvasProps> = ({
  attractorVisualizerServ,
}) => {
  const [initialized, setInitialized] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialized) {
      return;
    }

    if (containerRef.current) {
      attractorVisualizerServ.init(containerRef.current);
      setInitialized(true);
    }
  }, [initialized]);

  return (
    <div
      className="h-screen w-screen z-0 absolute top-0 left-0"
      ref={containerRef}
    />
  );
};

export default AttractorVisCanvas;
