import useBifurcationExplorerStatus from '../../../../../stores/AttractorBifurcationExplorer/useBifurcationExplorerStatus';
import TextIconButtonReact from '../../../lit-wrappers/TextIconButtonReact';

import PlusIcon from '../../../../../assets/icons/add_box.svg';
import AttractorBifurcationExplorer from '../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorer';
import DecisionTableRow from './DecisionTableRow/DecisionTableRow';

const DecisionTable: React.FC<{ nodeId: number; nodeCardinality: number }> = ({
  nodeId,
  nodeCardinality,
}) => {
  const decisions = useBifurcationExplorerStatus(
    (state) => state.availableDecisions
  );

  if (!decisions) {
    return (
      <TextIconButtonReact
        className="mb-2"
        compWidth="95%"
        text="Get Decisions"
        iconAlt="Plus Icon"
        iconSrc={PlusIcon}
        handleClick={() => AttractorBifurcationExplorer.getDecisions(nodeId)}
      />
    );
  }

  const renderTable = () => {
    return (
      <>
        {decisions?.map((decision, index) => (
          <DecisionTableRow
            key={index}
            decision={decision}
            nodeId={nodeId}
            nodeCardinality={nodeCardinality}
          />
        ))}
      </>
    );
  };

  return (
    <section className="flex flex-col w-full max-h-[100px] md:max-h-[200px] xl:max-h-[300px] 2xl:max-h-[400px] gap-2 overflow-y-auto">
      {renderTable()}
    </section>
  );
};

export default DecisionTable;
