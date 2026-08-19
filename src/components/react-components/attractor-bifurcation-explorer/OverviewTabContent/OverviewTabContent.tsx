import type { DecisionMixedNode, LeafNode } from '../../../../types/types';
import NoDataText from '../../global/NoDataText/NoDataText';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import BehaviorClassTable from './BehaviorClassTable/BehaviorClassTable';
import NecessaryConditionsTable from './NecessaryConditionsTable/NecessaryConditionsTable';
import NodeStatTable from './NodeStatTable/NodeStatTable';
import type { OverviewTabContentProps } from './OverviewTabContentProps';
import WitnessAttractorRow from './WitnesAttractorRow/WitnessAttractorRow';

const OverviewTabContent: React.FC<OverviewTabContentProps> = ({
  attractorBifurcationExplorerServ,
  behaviorClassOperationsServ,
  messageServ,
  pageStringProviderServ,

  bifurcationExplorerStatusStore,
  helpHoverStore,
}) => {
  const selectedNode: LeafNode | DecisionMixedNode | null =
    bifurcationExplorerStatusStore((state) => state.selectedNode);

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
            textColor="var(--color-primary-text)"
            headerText={selectedNode.label ?? 'Unknown'}
            justifyHeader="center"
            textFontSize="26px"
            lineHeight="30px"
            textFontFamily="var(--base-font-family)"
          />
        ) : (
          <span className="flex flex-row justify-center h-[30px] w-full text-[30px] font-normal font-[Symbols] text-(--color-primary-text) overflow-hidden mb-[-10px]">
            {selectedNode.label ?? 'Unknown'}
          </span>
        )}
      </section>

      <section className="h-fit w-full flex flex-col justify-center items-center gap-2">
        <NodeStatTable
          nodeData={selectedNode}
          attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
        />

        {selectedNode.type === 'leaf' ? (
          <WitnessAttractorRow
            leafNodeId={selectedNode.id}
            attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
            messageServ={messageServ}
            pageStringProviderServ={pageStringProviderServ}
            helpHoverStore={helpHoverStore}
          />
        ) : null}

        {selectedNode.classes ? (
          <BehaviorClassTable
            classes={selectedNode.classes ?? []}
            nodeCardinality={selectedNode.cardinality}
            isLeaf={selectedNode.type === 'leaf'}
            attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
            behaviorClassOperationsServ={behaviorClassOperationsServ}
          />
        ) : null}

        {selectedNode.type === 'leaf' ? (
          <NecessaryConditionsTable
            nodeId={selectedNode.id}
            attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
          />
        ) : null}
      </section>
    </div>
  );
};

export default OverviewTabContent;
