import { useEffect, useMemo } from 'react';
import type { Phenotype } from '../../../../types/types';
import SearchTable from '../../global/SearchTable/SearchTable';
import type { PhenotypesOverlayContentProps } from './PhenotypesOverlayContentProps';

import SectionWithDotHeader from '../../global/SectionWithDotHeader/SectionWithDotHeader';
import StatEntryReact from '../../lit-wrappers/StatEntryReact';
import TextIconButtonReact from '../../lit-wrappers/TextIconButtonReact';

import AddIcon from '../../../../assets/icons/add_box.svg';
import TableRowWithName from '../../global/NameTableRow/TableRowWithName';

import BlackDeleteIcon from '../../../../assets/icons/delete-24px.svg';
import DeleteIcon from '../../../../assets/icons/white-delete.svg';
import { isErr } from '../../../../types/result';

const PhenotypesOverlayContent: React.FC<PhenotypesOverlayContentProps> = ({
  filterElementsFunction,

  liveModelServ,
  phenotypeEditorServ,
  messageServ,
  pageStringProviderServ,

  controlStore,
  helpHoverStore,
}) => {
  useEffect(() => {
    return () => helpHoverStore.getState().clear();
  });

  const phenotypes = controlStore((state) => state.phenotypes);
  const phenotypesInComp = controlStore(
    (state) => state.phenotypesUsedInComputation
  );
  const editedPhenotype = controlStore(
    (state) => state.currentlyEditedPhenotype
  );

  const phenotypesWithId = useMemo(() => {
    return Object.entries(phenotypes)
      .map(([id, phen]) => {
        return { ...phen, id: Number(id) };
      })
      .sort((phenA, phenB) => {
        if (phenA.id === -1 && phenB.id !== -1) return -1;

        if (phenB.id === -1 && phenA.id !== -1) return 1;

        return phenA.name.localeCompare(phenB.name);
      });
  }, [phenotypes]);

  const phenotypesInComputationString = useMemo(() => {
    let nameString = '';
    phenotypesInComp.forEach((phenId) => {
      if (phenotypes[phenId]) {
        nameString += `${nameString.length === 0 ? '' : ', '}${phenotypes[phenId].name}`;
      }
    });

    return nameString;
  }, [phenotypes, phenotypesInComp]);

  const statistics = [
    ['Number of Phenotypes', phenotypesWithId.length.toString()],
    ['Currently Edited Phenotype', editedPhenotype.name],
    ['Used in computations', phenotypesInComputationString],
  ];

  const rowButtons = (
    phenotype: Phenotype,
    usedInComputation: boolean,
    isDefaultPhenotype: boolean
  ) => {
    const computationButton = {
      text: 'Comp',
      icon: DeleteIcon,
      iconAlt: 'Trash',
      handleClick: () => {
        if (usedInComputation) {
          messageServ.showFromResult(
            liveModelServ.Control.removePhenotypeFromComp(phenotype.id),
            'Failed to remove phenotype from computations'
          );
        } else {
          messageServ.showFromResult(
            liveModelServ.Control.includePhenotypeInComp(phenotype.id),
            'Failed to include phenotype in computations'
          );
        }
      },
      buttonBgColor: usedInComputation
        ? 'var(--color-positive)'
        : 'var(--color-neutral)',
      buttonTextColor: 'var(--color-positive-text)',
      buttonHoverColor: usedInComputation
        ? 'var(--color-positive-highlight)'
        : 'var(--color-neutral-highlight)',
      buttonActiveColor: 'var(--color-positive)',
      buttonTooltipFunction: (e: MouseEvent) => {
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(e, phenotype.name, true, -50, 50);
      },
      isActive: false,
    };

    const deleteButton = {
      text: 'Del',
      icon: isDefaultPhenotype ? BlackDeleteIcon : DeleteIcon,
      iconAlt: 'Trash',
      handleClick: () => {
        if (!isDefaultPhenotype) {
          messageServ.showFromResult(
            liveModelServ.Control.removePhenotype(phenotype.id),
            'Failed to remove phenotype'
          );
        }
      },
      buttonBgColor: isDefaultPhenotype
        ? 'var(--color-tertiary-buttons-disabled)'
        : 'var(--color-delete-darker)',
      buttonTextColor: isDefaultPhenotype
        ? 'var(--color-teritary-text)'
        : 'var(--color-delete-text)',
      buttonHoverColor: isDefaultPhenotype
        ? 'var(--color-tertiary-buttons-disabled)'
        : 'var(--color-delete-hover)',
      buttonActiveColor: 'var(--color-delete-active)',
      buttonTooltipFunction: (e: MouseEvent) => {
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e,
            pageStringProviderServ.Tooltips.deletePhenotypeButton(
              isDefaultPhenotype
            ),
            true,
            -50,
            50
          );
      },
      isActive: false,
    };

    return [computationButton, deleteButton];
  };

  const changePhenotypeName = (
    id: number,
    oldName: string,
    newName: string
  ) => {
    if (oldName === newName) {
      return newName;
    }

    const result = messageServ.showFromResult(
      liveModelServ.Control.renamePhenotype(id, newName),
      'Failed to rename phenotype'
    );

    if (!isErr(result)) {
      return id === -1 ? oldName : newName;
    }
  };

  return (
    <div className="flex flex-none flex-col items-center h-[50vh] w-[50vw] gap-3">
      <SectionWithDotHeader text="Statistics">
        <section className="flex flex-col items-center h-fit w-full gap-0.5">
          {statistics.map((stat) => {
            return (
              <StatEntryReact
                key={stat[0]}
                compWidth="98%"
                addColon={true}
                textColor="var(--color-secondary-text)"
                contBgColor="var(--color-secondary-darker)"
                statName={stat[0]}
                statValue={stat[1]}
              />
            );
          })}
        </section>
      </SectionWithDotHeader>

      <>
        <SectionWithDotHeader text="Available Phenotypes">
          <div className="h-[30px] w-[98%] flex items-center justify-end">
            <TextIconButtonReact
              className="mr-1"
              compHeight="90%"
              compWidth="20%"
              iconSrc={AddIcon}
              iconAlt="Add"
              iconHeight="19px"
              text="Add Phenotype"
              buttonColor="var(--color-secondary-buttons)"
              buttonHoverColor="var(--color-secondary-buttons-hover)"
              textColor="var(--color-secondary-text)"
              handleClick={() => {
                messageServ.showFromResult(
                  liveModelServ.Control.createNewPhenotype(),
                  'Failed to create new phenotype'
                );
              }}
              onMouseEnter={(e: React.MouseEvent) =>
                helpHoverStore
                  .getState()
                  .setHelpHoverAtMouse(
                    e.nativeEvent,
                    pageStringProviderServ.Tooltips.createNewPhenotypeButton(),
                    true,
                    -50
                  )
              }
              onMouseLeave={() => helpHoverStore.getState().clear()}
            />
          </div>

          <SearchTable<Phenotype>
            elements={phenotypesWithId}
            filterElements={(elements, text) => {
              return filterElementsFunction(elements, text);
            }}
            getSearchText={() => phenotypeEditorServ.getPhenotypesSearch()}
            setSearchText={(text: string) =>
              phenotypeEditorServ.setPhenotypesSearch(text)
            }
            textInputColor="var(--color-secondary-text-inputs)"
            textInputBorderColor="var(--color-secondary-text-inputs-border)"
            textInputTextColor="var(--color-secondary-text)"
            searchPlaceholder="Search Phenotypes..."
            noRowsPlaceholder="No Phenotypes Available"
            noRowsTextColor="var(--color-primary-text)"
            noRowsHeight="100px"
            noRowsWidth="98%"
            hideTooltipFunction={() => helpHoverStore.getState().clear()}
            renderRowsWithContainer={(filteredElements) => (
              <section className="flex flex-col overflow-auto min-h-[100px] h-auto max-h-[25vh] w-[98%] px-[2%] pb-1 mb-1 gap-1">
                {filteredElements.map((el) => {
                  const isSelected = el.id === editedPhenotype.id;

                  return (
                    <TableRowWithName
                      key={el.id}
                      name={el.name}
                      isSelected={isSelected}
                      handleClick={() =>
                        messageServ.showFromResult(
                          liveModelServ.Control.changeCurrentlyEditedPhenotype(
                            el.id
                          ),
                          'Failed to switch currently edited phenotype'
                        )
                      }
                      handleNameChange={(newName) => {
                        return changePhenotypeName(el.id, el.name, newName);
                      }}
                      handleNameSubmit={(newName) => {
                        return changePhenotypeName(el.id, el.name, newName);
                      }}
                      nameTooltipFun={(e: MouseEvent) =>
                        helpHoverStore
                          .getState()
                          .setHelpHoverAtMouse(e, el.name, true, -50, 50)
                      }
                      hideTooltipFun={() => helpHoverStore.getState().clear()}
                      nameTextColor="var(--color-tertiary-text)"
                      nameBgcolor="var(--color-tertiary-lighter)"
                      rerenderOnNameUpdate={el.id === -1}
                      contColor="var(--color-secondary-light)"
                      contHoverColor="var(--color-secondary-light-highlight)"
                      contActiveColor="var(--color-secondary-light-active)"
                      contActiveBorderColor="var(--color-secondary-light-border)"
                      contHoverBorderColor="var(--color-secondary-light-border)"
                      contBorderColor="var(--color-secondary-light)"
                      buttons={rowButtons(
                        el,
                        phenotypesInComp.has(el.id),
                        el.id === -1
                      )}
                      buttonsGap="7px"
                      buttonWidth="100px"
                    />
                  );
                })}
              </section>
            )}
          />
        </SectionWithDotHeader>
      </>
    </div>
  );
};

export default PhenotypesOverlayContent;
