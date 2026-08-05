import { useEffect, useMemo } from 'react';
import type { Phenotype } from '../../../../types';
import SearchTable from '../../global/SearchTable/SearchTable';
import type { PhenotypesOverlayContentProps } from './PhenotypesOverlayContentProps';
import PhenotypesTableRow from './PhenotypesTableRow/PhenotypesTableRow';

import SectionWithDotHeader from '../../global/SectionWithDotHeader/SectionWithDotHeader';
import StatEntryReact from '../../lit-wrappers/StatEntryReact';
import TextIconButtonReact from '../../lit-wrappers/TextIconButtonReact';

import AddIcon from '../../../../assets/icons/add_box.svg';

const PhenotypesOverlayContent: React.FC<PhenotypesOverlayContentProps> = ({
  filterElementsFunction,

  liveModelServ,
  phenotypeEditorServ,
  pageStringProviderServ,

  controlStore,
  helpHoverStore,
}) => {
  useEffect(() => {
    return () => helpHoverStore.getState().clear();
  });

  const phenotypes = controlStore((state) => state.phenotypes);
  const currentPhenotype = controlStore((state) => state.currentPhenotype);

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

  const statistics = [
    ['Number of Phenotypes', phenotypesWithId.length.toString()],
    ['Currently Edited Phenotype', currentPhenotype.name],
  ];

  const changePhenotypeName = (
    id: number,
    oldName: string,
    newName: string
  ) => {
    if (oldName === newName) {
      return newName;
    }

    const result = liveModelServ.Control.renamePhenotype(id, newName);

    if (result != undefined && id === -1) {
      return oldName;
    }

    return result != undefined ? newName : undefined;
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
                liveModelServ.Control.createNewPhenotype();
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
            renderRowsWithContainer={(filteredElements) => (
              <section className="flex flex-col overflow-auto min-h-[100px] h-auto max-h-[25vh] w-[98%] px-[2%] pb-1 mb-1 gap-1">
                {filteredElements.map((el) => (
                  <PhenotypesTableRow
                    key={el.id}
                    phenotypeId={el.id}
                    phenotypeName={el.name}
                    isSelected={el.id === currentPhenotype.id}
                    changeActivePhenotype={(id: number) =>
                      liveModelServ.Control.changeCurrentlyActivePhenotype(id)
                    }
                    handleChange={(newName) => {
                      return changePhenotypeName(el.id, el.name, newName);
                    }}
                    handleSubmit={(newName) => {
                      return changePhenotypeName(el.id, el.name, newName);
                    }}
                    helpHoverStore={helpHoverStore}
                  />
                ))}
              </section>
            )}
          />
        </SectionWithDotHeader>
      </>
    </div>
  );
};

export default PhenotypesOverlayContent;
