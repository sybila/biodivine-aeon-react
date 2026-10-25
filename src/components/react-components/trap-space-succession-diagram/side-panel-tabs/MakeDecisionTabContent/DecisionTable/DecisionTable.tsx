import { useMemo, useState, type ReactElement } from 'react';
import TextIconButtonReact from '../../../../lit-wrappers/TextIconButtonReact';

import PlusIcon from '../../../../../../assets/icons/add_box.svg';
import type {
  NodeDataTSSD,
  StableMotifInfo,
} from '../../../../../../types/types';
import BasicTable from '../../../../global/BasicTable/BasicTable';
import PagingWrapper from '../../../../global/PagingWrapper/PagingWrapper';
import SectionWithDotHeader from '../../../../global/SectionWithDotHeader/SectionWithDotHeader';
import MakeDecisionFilters from '../MakeDecisionFilters/MakeDecisionFilters';
import type { TSSDVariableTrapSpaceFilterStateArray } from '../VarTrapSpaceStateFilterTable/VarTrapSpaceStateFilterTableProps';
import type { DecisionTableProps } from './DecisionTableProps';

function DecisionTable<Element extends NodeDataTSSD | StableMotifInfo>({
  selectedNodeId,
  variableNames,
  parentType,

  renderRow,

  trapSpaceSDServ,
  generalStringsServ,
  tooltipStringsServ,
  searchAndFilterHelpersServ,

  trapSpaceSDStatusStore,
  helpHoverStore,
}: DecisionTableProps<Element>): ReactElement {
  const [decisionsOpened, setDecisionsOpened] = useState(false);
  const decisionsWithParentInfo = trapSpaceSDStatusStore(
    (state) => state.availableDecisions
  );

  const [decisionsOnPage, setDecisionsOnPage] = useState<Array<Element>>([]);
  const [decisionFilters, setDecisionFilters] =
    useState<TSSDVariableTrapSpaceFilterStateArray>([]);

  const filteredTrapSpaces: Element[] | null = useMemo(() => {
    if (
      decisionsWithParentInfo == null ||
      decisionsWithParentInfo.parentType != parentType
    ) {
      return null;
    }

    const allDecisions = decisionsWithParentInfo.nodes as Element[];

    return decisionFilters.length < 1
      ? allDecisions
      : allDecisions.filter((decision) =>
          decisionFilters.every(
            (decisionFilter) =>
              decision.variableValues[decisionFilter.varName] ===
              decisionFilter.trapSpaceValue
          )
        );
  }, [decisionsWithParentInfo, decisionFilters]);

  const tableStrings =
    parentType != 'stable-motif'
      ? {
          tableHeader: generalStringsServ.stableMotifsTableHeader,
          noRows: generalStringsServ.noAvailableStableMotifs,
        }
      : {
          tableHeader: generalStringsServ.trapSpacesTableHeader,
          noRows: generalStringsServ.noAvailableTrapSpaces,
        };

  const renderGetDecisionsButton = () => {
    return (
      <TextIconButtonReact
        className="mb-2"
        compWidth="95%"
        text={generalStringsServ.getDecisionsButton()}
        textColor="var(--color-secondary-text)"
        buttonColor="var(--color-secondary-buttons)"
        buttonHoverColor="var(--color-secondary-buttons-hover)"
        iconAlt="Plus Icon"
        iconSrc={PlusIcon}
        handleClick={() => {
          if (!decisionsWithParentInfo) {
            trapSpaceSDServ.getDecisions(selectedNodeId, parentType);
          }
          setDecisionsOpened(true);
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

  const renderTable = (availableTrapSpaces: Element[]) => {
    return (
      <section
        className="flex flex-col w-full min-h-[150px] gap-2 overflow-y-auto"
        style={{ maxHeight: 'calc(70vh - 300px)' }}
      >
        {availableTrapSpaces.map((trapSpace, index) =>
          renderRow(trapSpace, index)
        )}
      </section>
    );
  };

  return (
    <>
      <SectionWithDotHeader
        text={generalStringsServ.filtersHeader()}
        textColor="var(--color-primary-text)"
        width="100%"
      >
        <MakeDecisionFilters
          variableNames={variableNames}
          setFilteredVariables={(filter) => setDecisionFilters(filter)}
          generalStringProviderServ={generalStringsServ}
          tooltipStringProviderServ={tooltipStringsServ}
          searchAndFilterHelpersServ={searchAndFilterHelpersServ}
          helpHoverStore={helpHoverStore}
        />
      </SectionWithDotHeader>

      <SectionWithDotHeader
        text={tableStrings.tableHeader()}
        textColor="var(--color-primary-text)"
        width="100%"
      >
        {!decisionsOpened ||
        !decisionsWithParentInfo ||
        !filteredTrapSpaces ||
        decisionsWithParentInfo.parentType != parentType ? (
          renderGetDecisionsButton()
        ) : (
          <PagingWrapper
            wrapperWidth="100%"
            elements={filteredTrapSpaces}
            numberOfElementsOnPage={15}
            setElementsOnPage={(elementsOnPage) =>
              setDecisionsOnPage(elementsOnPage)
            }
            tooltipStringsServ={tooltipStringsServ}
            helpHoverStore={helpHoverStore}
          >
            <BasicTable
              elements={decisionsOnPage}
              noRowsPlaceholder={tableStrings.noRows()}
              noRowsTextColor="var(--color-primary-text)"
              renderRowsWithContainer={(decisions: Element[]) =>
                renderTable(decisions)
              }
            />
          </PagingWrapper>
        )}
      </SectionWithDotHeader>
    </>
  );
}

export default DecisionTable;
