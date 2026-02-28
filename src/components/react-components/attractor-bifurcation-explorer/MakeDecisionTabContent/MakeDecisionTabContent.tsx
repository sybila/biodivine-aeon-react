import type { DecisionMixedNode, LeafNode } from '../../../../types';
import NoDataText from '../../global/NoDataText/NoDataText';
import SeparatorLine from '../../global/SeparatorLine/SeparatorLine';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';

import AutoExpandSection from './AutoExpandSection/AutoExpandSection';
import DecisionTable from './DecisionTable/DecisionTable';
import type { MakeDecisionTabContentProps } from './MakeDecisionTabContentProps';

const MakeDecisionTabContent: React.FC<MakeDecisionTabContentProps> = ({
  attractorBifurcationExplorerServ,
  behaviorClassOperationsServ,
  bifurcationExplorerStatusStore,
}) => {
  const selectedNode: DecisionMixedNode | LeafNode | null =
    bifurcationExplorerStatusStore((state) => state.selectedNode);

  if (!selectedNode) {
    return <NoDataText text="No selected node" />;
  }

  if (selectedNode.type != 'unprocessed') {
    return <NoDataText text="Decisions can only be made on mixed nodes." />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-2">
      <section className="flex flex-col justify-end items-center h-fit w-full gap-3">
        <DotHeaderReact
          compHeight="30px"
          compWidth="100%"
          justifyHeader="start"
          headerText="Auto-Expand"
        />

        <AutoExpandSection
          attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
        />
      </section>

      <SeparatorLine />

      <section className="flex flex-col justify-end items-center h-fit w-full gap-2">
        <DotHeaderReact
          compHeight="30px"
          compWidth="100%"
          justifyHeader="start"
          headerText="Decisions"
        />
        <DecisionTable
          nodeId={selectedNode.id}
          nodeCardinality={selectedNode.cardinality}
          attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
          behaviorClassOperationsServ={behaviorClassOperationsServ}
          bifurcationExplorerStatusStore={bifurcationExplorerStatusStore}
        />
      </section>
    </div>
  );
};

export default MakeDecisionTabContent;
