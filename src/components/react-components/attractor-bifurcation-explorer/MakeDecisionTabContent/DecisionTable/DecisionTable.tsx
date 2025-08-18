import useBifurcationExplorerStatus from '../../../../../stores/AttractorBifurcationExplorer/useBifurcationExplorerStatus';
import TextIconButtonReact from '../../../lit-wrappers/TextIconButtonReact';

import PlusIcon from '../../../../../assets/icons/add_box.svg';
import AttractorBifurcationExplorer from '../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorer';
import DecisionTableRow from './DecisionTableRow/DecisionTableRow';
import { useState } from 'react';

const DecisionTable: React.FC<{ nodeId: number; nodeCardinality: number }> = ({
  nodeId,
  nodeCardinality,
}) => {
  const [decisionsOpened, setDecisionsOpened] = useState(false);
  const decisions = useBifurcationExplorerStatus(
    (state) => state.availableDecisions
  );

  if (!decisionsOpened || !decisions) {
    return (
      <TextIconButtonReact
        className="mb-2"
        compWidth="95%"
        text="Get Decisions"
        iconAlt="Plus Icon"
        iconSrc={PlusIcon}
        handleClick={() => {
          if (!decisions) {
            AttractorBifurcationExplorer.getDecisions(nodeId);
          }
          setDecisionsOpened(true);
        }}
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
