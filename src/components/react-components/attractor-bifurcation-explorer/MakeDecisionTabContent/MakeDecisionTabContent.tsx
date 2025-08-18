import useBifurcationExplorerStatus from '../../../../stores/AttractorBifurcationExplorer/useBifurcationExplorerStatus';
import type { DecisionMixedNode } from '../../../../types';
import SeparatorLine from '../../global/SeparatorLine/SeparatorLine';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import NoDataText from '../NoDataText/NoDataText';

import AutoExpandSection from './AutoExpandSection/AutoExpandSection';
import DecisionTable from './DecisionTable/DecisionTable';

const MakeDecisionTabContent: React.FC = () => {
  const selectedNode: DecisionMixedNode | null = useBifurcationExplorerStatus(
    (state) => state.selectedNode
  );

  if (!selectedNode) {
    return <NoDataText text="No selected node" />;
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

        <AutoExpandSection />
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
        />
      </section>
    </div>
  );
};

export default MakeDecisionTabContent;
