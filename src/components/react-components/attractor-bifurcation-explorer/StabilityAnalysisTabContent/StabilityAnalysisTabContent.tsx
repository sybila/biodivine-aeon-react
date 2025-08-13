import useBifurcationExplorerStatus from '../../../../stores/AttractorBifurcationExplorer/useBifurcationExplorerStatus';
import NoSelectedNode from '../NoSelectedNode/NoSelectedNode';
import StabilityAnalysisSelector from './StabilityAnalysisSelector/StabilityAnalysisSelector';

const StabilityAnalysisTabContent = () => {
  const selectedNode = useBifurcationExplorerStatus(
    (state) => state.selectedNode
  );

  if (!selectedNode) {
    return <NoSelectedNode />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-3">
      <StabilityAnalysisSelector />
    </div>
  );
};

export default StabilityAnalysisTabContent;
