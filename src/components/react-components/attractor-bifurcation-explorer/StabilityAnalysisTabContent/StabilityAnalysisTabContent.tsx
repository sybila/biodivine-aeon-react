import useBifurcationExplorerStatus from '../../../../stores/AttractorBifurcationExplorer/useBifurcationExplorerStatus';
import NoDataText from '../NoDataText/NoDataText';
import StabilityAnalysisSelector from './StabilityAnalysisSelector/StabilityAnalysisSelector';
import StabilityAnalysisTable from './StabilityAnalysisTable/StabilityAnalysisTable';

const StabilityAnalysisTabContent = () => {
  const selectedNode = useBifurcationExplorerStatus(
    (state) => state.selectedNode
  );

  if (!selectedNode) {
    return <NoDataText text="No selected node" />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-3">
      <StabilityAnalysisSelector nodeId={selectedNode.id} />
      <StabilityAnalysisTable />
    </div>
  );
};

export default StabilityAnalysisTabContent;
