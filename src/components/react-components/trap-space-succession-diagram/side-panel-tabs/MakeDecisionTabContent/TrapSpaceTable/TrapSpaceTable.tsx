import { useState } from 'react';
import TextIconButtonReact from '../../../../lit-wrappers/TextIconButtonReact';
import type { TrapSpaceTableProps } from './TrapSpaceTableProps';

import PlusIcon from '../../../../../../assets/icons/add_box.svg';
import type { NodeDataTSSD, StableMotifInfo } from '../../../../../../types/types';
import BasicTable from '../../../../global/BasicTable/BasicTable';
import TrapSpaceRow from './TrapSpaceRow/TrapSpaceRow';

const TrapSpaceTable: React.FC<TrapSpaceTableProps> = ({
  selectedNodeId,

  trapSpaceSDServ,
  generalStringsServ,
  tooltipStringsServ,

  trapSpaceSDStatusStore,
  helpHoverStore,
}) => {
  const [motifsOpened, setMotifsOpened] = useState(false);
  const trapSpaces = trapSpaceSDStatusStore(
    (state) => state.availableDecisions
  );

  if (
    !motifsOpened ||
    !trapSpaces ||
    trapSpaces.parentType != 'stable-motif'
  ) {
    return (
      <TextIconButtonReact
        className="mb-2"
        compWidth="95%"
        text={generalStringsServ.getTrapSpacesButton()}
        textColor="var(--color-secondary-text)"
        buttonColor="var(--color-secondary-buttons)"
        buttonHoverColor="var(--color-secondary-buttons-hover)"
        iconAlt="Plus Icon"
        iconSrc={PlusIcon}
        handleClick={() => {
          if (!trapSpaces) {
            trapSpaceSDServ.getDecisions(selectedNodeId, 'stable-motif');
          }
          setMotifsOpened(true);
          helpHoverStore.getState().clear();
        }}
        onMouseEnter={(e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              tooltipStringsServ.getDecisionsButton(),
              true,
              -50
            )
        }
        onMouseLeave={() => helpHoverStore.getState().clear()}
      />
    );
  }

  const renderTable = (availableTrapSpaces: NodeDataTSSD[]) => {
    return (
      <section className="flex flex-col w-full max-h-[100px] md:max-h-[200px] xl:max-h-[300px] 2xl:max-h-[400px] gap-2 overflow-y-auto">
        {availableTrapSpaces.map((trapSpace, index) => (
          <TrapSpaceRow
            key={index}
            nodeId={selectedNodeId}
            trapSpaceData={trapSpace}
            trapSpaceSDServ={trapSpaceSDServ}
            generalStringsServ={generalStringsServ}
            tooltipStringsServ={tooltipStringsServ}
            helpHoverStore={helpHoverStore}
          />
        ))}
      </section>
    );
  };

  return (
    <BasicTable
      elements={trapSpaces.nodes}
      noRowsPlaceholder={generalStringsServ.noAvailableStableMotifs()}
      noRowsTextColor="var(--color-primary-text)"
      renderRowsWithContainer={(trapSpaces: NodeDataTSSD[]) =>
        renderTable(trapSpaces)
      }
    />
  );
};

export default TrapSpaceTable;
