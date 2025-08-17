import useBifurcationExplorerStatus from '../../../../stores/AttractorBifurcationExplorer/useBifurcationExplorerStatus';
import type { DecisionMixedNode } from '../../../../types';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import NoSelectedNode from '../NoSelectedNode/NoSelectedNode';
import AutoExpandSection from './AutoExpandSection/AutoExpandSection';
import DecisionTable from './DecisionTable/DecisionTable';

const MakeDecisionTabContent: React.FC = () => {
  const selectedNode: DecisionMixedNode | null = useBifurcationExplorerStatus(
    (state) => state.selectedNode
  );

  if (!selectedNode) {
    return <NoSelectedNode />;
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

      <div className="h-[2px] w-[94%] mt-2 mb-2 bg-gray-300" />

      <section className="flex flex-col justify-end items-center h-fit w-full gap-2">
        <DotHeaderReact
          compHeight="30px"
          compWidth="100%"
          justifyHeader="start"
          headerText="Decisions"
        />
        <DecisionTable />
      </section>
    </div>
  );
};

export default MakeDecisionTabContent;
