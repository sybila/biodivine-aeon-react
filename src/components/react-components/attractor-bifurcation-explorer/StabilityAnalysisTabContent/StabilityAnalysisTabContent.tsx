import NoDataText from '../../global/NoDataText/NoDataText';
import StabilityAnalysisSelector from './StabilityAnalysisSelector/StabilityAnalysisSelector';
import type { StabilityAnalysisTabContentProps } from './StabilityAnalysisTabContentProps';
import StabilityAnalysisTable from './StabilityAnalysisTable/StabilityAnalysisTable';

const StabilityAnalysisTabContent: React.FC<
  StabilityAnalysisTabContentProps
> = ({
  attractorBifurcationExplorerServ,
  messageServ,
  pageStringProviderServ,

  bifurcationExplorerStatusStore,
  helpHoverStore,
}) => {
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
        pageStringProviderServ={pageStringProviderServ}
        bifurcationExplorerStatusStore={bifurcationExplorerStatusStore}
        helpHoverStore={helpHoverStore}
      />
      <StabilityAnalysisTable
        attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
        pageStringProviderServ={pageStringProviderServ}
        messageServ={messageServ}
        bifurcationExplorerStatusStore={bifurcationExplorerStatusStore}
        helpHoverStore={helpHoverStore}
      />
    </div>
  );
};

export default StabilityAnalysisTabContent;
