import useBifurcationExplorerStatus from '../../../../stores/AttractorBifurcationExplorer/useBifurcationExplorerStatus';
import type { DecisionMixedNode } from '../../../../types';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import NoDataText from '../NoDataText/NoDataText';
import BehaviorClassTable from './BehaviorClassTable/BehaviorClassTable';

const OverviewTabContent: React.FC = () => {
  const selectedNode: DecisionMixedNode | null = useBifurcationExplorerStatus(
    (state) => state.selectedNode
  );

  if (!selectedNode) {
    return <NoDataText text="No selected node" />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-3">
      <SimpleHeaderReact
        className="ml-[24px] mt-1"
        compHeight="fit-content"
        headerText={selectedNode.label}
        textFontSize="26px"
        lineHeight="30px"
      />
      <BehaviorClassTable {...selectedNode} />
    </div>
  );
};

export default OverviewTabContent;
