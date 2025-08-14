import useBifurcationExplorerStatus from '../../../../stores/AttractorBifurcationExplorer/useBifurcationExplorerStatus';
import NoSelectedNode from '../NoSelectedNode/NoSelectedNode';
import StabilityAnalysisSelector from './StabilityAnalysisSelector/StabilityAnalysisSelector';
import StabilityAnalysisTable from './StabilityAnalysisTable/StabilityAnalysisTable';

const StabilityAnalysisTabContent = () => {
  const selectedNode = useBifurcationExplorerStatus(
    (state) => state.selectedNode
  );

  if (!selectedNode) {
    return <NoSelectedNode />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-3">
      <StabilityAnalysisSelector nodeId={selectedNode.id} />
      <StabilityAnalysisTable />
    </div>
  );
};

export default StabilityAnalysisTabContent;
