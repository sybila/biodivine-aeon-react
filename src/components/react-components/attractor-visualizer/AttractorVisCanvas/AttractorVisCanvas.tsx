import { useEffect, useRef, useState } from 'react';
import AttractorVisualizer from '../../../../services/attractor-visualizer/AttractorVisualizer';

const AttractorVisCanvas: React.FC = () => {
  const [initialized, setInitialized] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialized) {
      return;
    }

    if (containerRef.current) {
      AttractorVisualizer.init(containerRef.current);
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
