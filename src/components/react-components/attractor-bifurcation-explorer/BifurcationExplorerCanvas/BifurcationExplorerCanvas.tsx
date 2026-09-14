import { useEffect, useRef } from 'react';
import type { BifurcationExplorerCanvasProps } from './BifurcationExplorerCanvasProps';

const BifurcationExplorerCanvas: React.FC<BifurcationExplorerCanvasProps> = ({
  initialized,
  setInitialized,
  attractorBifurcationExplorerServ,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialized) {
      return;
    }

    if (containerRef.current) {
      attractorBifurcationExplorerServ.init(containerRef.current);
      setInitialized(true);
    }
  }, [initialized]);

  return (
    <div
      className="h-screen w-screen z-0 absolute top-0 left-0"
      ref={containerRef}
    ></div>
  );
};

export default BifurcationExplorerCanvas;
