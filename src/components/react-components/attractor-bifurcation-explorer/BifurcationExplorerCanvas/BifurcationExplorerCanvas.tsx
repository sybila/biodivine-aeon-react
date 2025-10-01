import { useEffect, useRef } from 'react';
import AttractorBifurcationExplorer from '../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorer';

const BifurcationExplorerCanvas: React.FC<{
  initialized: boolean;
  setInitialized: (initialized: boolean) => void;
}> = ({ initialized, setInitialized }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialized) {
      return;
    }

    if (containerRef.current) {
      AttractorBifurcationExplorer.init(containerRef.current);
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
