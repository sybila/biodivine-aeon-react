import useBifurcationExplorerStatus from '../../../../stores/AttractorBifurcationExplorer/useBifurcationExplorerStatus';
import type { DecisionMixedNode, LeafNode } from '../../../../types';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import NoDataText from '../NoDataText/NoDataText';
import BehaviorClassTable from './BehaviorClassTable/BehaviorClassTable';
import NecessaryConditionsTable from './NecessaryConditionsTable/NecessaryConditionsTable';
import NodeStatTable from './NodeStatTable/NodeStatTable';
import WittnessAttractorRow from './WittnesAttractorRow/WittnessAttractorRow';

const OverviewTabContent: React.FC = () => {
  const selectedNode: LeafNode | DecisionMixedNode | null =
    useBifurcationExplorerStatus((state) => state.selectedNode);

  if (!selectedNode) {
    return <NoDataText text="No selected node" />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-2">
      <section className="min-h-[30px] max-h-[60px] w-[95%] ml-[24px] overflow-auto">
        {selectedNode.type != 'leaf' ? (
          <SimpleHeaderReact
            compHeight="fit-content"
            compWidth="100%"
            headerText={selectedNode.label ?? 'Unknown'}
            justifyHeader="center"
            textFontSize="26px"
            lineHeight="30px"
            textFontFamily="var(--base-font-family)"
          />
        ) : (
          <span className="flex flex-row justify-center h-[30px] w-full text-[30px] font-normal font-[Symbols] overflow-hidden mb-[-10px]">
            {selectedNode.label ?? 'Unknown'}
          </span>
        )}
      </section>

      <section className="h-fit w-full flex flex-col justify-center items-center gap-2">
        <NodeStatTable {...selectedNode} />

        {selectedNode.type === 'leaf' ? <WittnessAttractorRow /> : null}

        {selectedNode.classes ? (
          <BehaviorClassTable
            classes={selectedNode.classes ?? []}
            nodeCardinality={selectedNode.cardinality}
            isLeaf={selectedNode.type === 'leaf'}
          />
        ) : null}

        {selectedNode.type === 'leaf' ? (
          <NecessaryConditionsTable nodeId={selectedNode.id} />
        ) : null}
      </section>
    </div>
  );
};

export default OverviewTabContent;
