import { useMemo, useState } from 'react';
import TextIconButtonReact from '../../../../lit-wrappers/TextIconButtonReact';
import type { TrapSpaceTableProps } from './TrapSpaceTableProps';

import PlusIcon from '../../../../../../assets/icons/add_box.svg';
import type { NodeDataTSSD } from '../../../../../../types/types';
import BasicTable from '../../../../global/BasicTable/BasicTable';
import SectionWithDotHeader from '../../../../global/SectionWithDotHeader/SectionWithDotHeader';
import type { TSSDVariableTrapSpaceFilterStateArray } from '../VarTrapSpaceStateFilterTable/VarTrapSpaceStateFilterTableProps';
import TrapSpaceRow from './TrapSpaceRow/TrapSpaceRow';
import TrapSpaceTableFilters from './TrapSpaceTableFilters/TrapSpaceTableFilters';

const TrapSpaceTable: React.FC<TrapSpaceTableProps> = ({
  selectedNodeId,
  variableNames,

  trapSpaceSDServ,
  generalStringsServ,
  tooltipStringsServ,
  searchAndFilterHelpersServ,

  trapSpaceSDStatusStore,
  helpHoverStore,
}) => {
  const [trapSpacesOpened, setTrapSpacesOpened] = useState(false);
  const trapSpaces = trapSpaceSDStatusStore(
    (state) => state.availableDecisions
  );

  const [trapSpaceFilter, setTrapSpaceFilter] =
    useState<TSSDVariableTrapSpaceFilterStateArray>([]);

  const filteredTrapSpaces = useMemo(() => {
    if (trapSpaces == null || trapSpaces.parentType != 'stable-motif') {
      return null;
    }

    return trapSpaceFilter.length < 1
      ? trapSpaces.nodes
      : trapSpaces.nodes.filter((trapSpace) =>
          trapSpaceFilter.every(
            (filterTrapSpace) =>
              trapSpace.variableValues[filterTrapSpace.varName] ===
              filterTrapSpace.trapSpaceValue
          )
        );
  }, [trapSpaces, trapSpaceFilter]);

  const renderGetTrapSpaceButton = () => {
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
          setTrapSpacesOpened(true);
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
  };

  const renderTable = (availableTrapSpaces: NodeDataTSSD[]) => {
    return (
      <section
        className="flex flex-col w-full min-h-[150px] gap-2 overflow-y-auto"
        style={{ maxHeight: 'calc(70vh - 300px)' }}
      >
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
    <>
      <SectionWithDotHeader
        text="Filters"
        textColor="var(--color-primary-text)"
        width="100%"
      >
        <TrapSpaceTableFilters
          variableNames={variableNames}
          setFilteredVariables={setTrapSpaceFilter.bind(this)}
          generalStringProviderServ={generalStringsServ}
          tooltipStringProviderServ={tooltipStringsServ}
          searchAndFilterHelpersServ={searchAndFilterHelpersServ}
          helpHoverStore={helpHoverStore}
        />
      </SectionWithDotHeader>

      <SectionWithDotHeader
        text="Decisions"
        textColor="var(--color-primary-text)"
        width="100%"
      >
        {!trapSpacesOpened ||
        !trapSpaces ||
        !filteredTrapSpaces ||
        trapSpaces.parentType != 'stable-motif' ? (
          renderGetTrapSpaceButton()
        ) : (
          <BasicTable
            elements={filteredTrapSpaces}
            noRowsPlaceholder={generalStringsServ.noAvailableStableMotifs()}
            noRowsTextColor="var(--color-primary-text)"
            renderRowsWithContainer={(trapSpaces: NodeDataTSSD[]) =>
              renderTable(trapSpaces)
            }
          />
        )}
      </SectionWithDotHeader>
    </>
  );
};

export default TrapSpaceTable;
