import { useEffect, useRef, useState } from 'react';
import CytoscapeME from '../../../../services/model-editor/CytoscapeME/CytoscapeME';

const ModelEditorCanvas: React.FC = () => {
  const [initialized, setInitialized] = useState<Boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialized) {
      return;
    }

    if (containerRef.current) {
      CytoscapeME.init(containerRef.current);
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

export default ModelEditorCanvas;
