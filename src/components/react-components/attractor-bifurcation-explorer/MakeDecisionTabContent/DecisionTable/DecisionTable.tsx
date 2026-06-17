import TextIconButtonReact from '../../../lit-wrappers/TextIconButtonReact';

import { useState } from 'react';
import PlusIcon from '../../../../../assets/icons/add_box.svg';
import type { DecisionTableProps } from './DecisionTableProps';
import DecisionTableRow from './DecisionTableRow/DecisionTableRow';

const DecisionTable: React.FC<DecisionTableProps> = ({
  nodeId,
  nodeCardinality,

  attractorBifurcationExplorerServ,
  behaviorClassOperationsServ,
  pageStringProviderServ,

  bifurcationExplorerStatusStore,
  helpHoverStore,
}) => {
  // TODO - remove when paging for decisions implemented (now causes lag on reenter)
  const [decisionsOpened, setDecisionsOpened] = useState(false);
  const decisions = bifurcationExplorerStatusStore(
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
            attractorBifurcationExplorerServ.getDecisions(nodeId);
          }
          setDecisionsOpened(true);
        }}
        onMouseEnter={(e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.getDecisionsButton(),
              true,
              -50
            )
        }
        onMouseLeave={() => helpHoverStore.getState().clear()}
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
            attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
            behaviorClassOperationsServ={behaviorClassOperationsServ}
            pageStringProviderServ={pageStringProviderServ}
            helpHoverStore={helpHoverStore}
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
