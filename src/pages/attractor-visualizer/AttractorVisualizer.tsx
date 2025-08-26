import KeepAlive from 'react-activation';
import AttractorVisCanvas from '../../components/react-components/attractor-visualizer/AttractorVisCanvas';

const AttractorVisualizer = () => {
  return (
    <KeepAlive>
      <AttractorVisCanvas />
    </KeepAlive>
  );
};

export default AttractorVisualizer;
