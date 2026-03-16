import NoDataText from '../../global/NoDataText/NoDataText';
import StabilityAnalysisSelector from './StabilityAnalysisSelector/StabilityAnalysisSelector';
import type { StabilityAnalysisTabContentProps } from './StabilityAnalysisTabContentProps';
import StabilityAnalysisTable from './StabilityAnalysisTable/StabilityAnalysisTable';

const StabilityAnalysisTabContent: React.FC<
  StabilityAnalysisTabContentProps
> = ({ attractorBifurcationExplorerServ, bifurcationExplorerStatusStore }) => {
  const selectedNode = bifurcationExplorerStatusStore(
    (state) => state.selectedNode
  );

  if (!selectedNode) {
    return <NoDataText text="No selected node" />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-3">
      <StabilityAnalysisSelector
        nodeId={selectedNode.id}
        attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
        bifurcationExplorerStatusStore={bifurcationExplorerStatusStore}
      />
      <StabilityAnalysisTable
        attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
        bifurcationExplorerStatusStore={bifurcationExplorerStatusStore}
      />
    </div>
  );
};

export default StabilityAnalysisTabContent;
