import { useEffect, useMemo } from 'react';
import type { Phenotype } from '../../../../types';
import ButtonsWithTextInput from '../../global/ButtonsWithTextInput/ButtonsWithTextInput';
import SearchTable from '../../global/SearchTable/SearchTable';
import type { PhenotypesOverlayContentProps } from './PhenotypesOverlayContentProps';
import PhenotypesTableRow from './PhenotypesTableRow/PhenotypesTableRow';

import AcceptIcon from '../../../../assets/icons/check-mark.svg';
import SectionWithDotHeader from '../../global/SectionWithDotHeader/SectionWithDotHeader';
import StatEntryReact from '../../lit-wrappers/StatEntryReact';

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
    return Object.entries(phenotypes).map(([id, phen]) => {
      return { ...phen, id: Number(id) };
    });
  }, [phenotypes]);

  const statistics = [
    ['Number of Phenotypes', phenotypesWithId.length.toString()],
    ['Active Phenotype', currentPhenotype.name],
  ];

  return (
    <div className="flex flex-none flex-col items-center h-auto max-h-[30vh] w-[50vw] gap-3">
      <SectionWithDotHeader text="Statistics">
        <section className="flex flex-col items-center h-fit w-full gap-0.5">
          {statistics.map((stat) => {
            return (
              <StatEntryReact
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

      <SectionWithDotHeader text="Available Phenotypes">
        <ButtonsWithTextInput
          buttons={[
            {
              text: 'Create New Phenotype',
              textInputPlaceholder: 'Insert Phenotype Name...',
              handleSubmit: () => {},
              buttonTooltipText:
                pageStringProviderServ.Tooltips.createNewPhenotypeButton(),
              buttonActiveTooltipText:
                pageStringProviderServ.Tooltips.exitCreatePhenotype(),
              submitButtonTooltipText:
                pageStringProviderServ.Tooltips.submitCreatePhenotype(),
            },
            {
              text: 'Rename Phenotype',
              textInputPlaceholder: 'Insert Phenotype Name...',
              handleSubmit: () => {},
              buttonTooltipText:
                pageStringProviderServ.Tooltips.renamePhenotypeButton(),
              buttonActiveTooltipText:
                pageStringProviderServ.Tooltips.exitRenamePhenotype(),
              submitButtonTooltipText:
                pageStringProviderServ.Tooltips.submitRenamePhenotype(),
            },
          ]}
          buttonsColor="var(--color-secondary-buttons)"
          buttonsHoverColor="var(--color-secondary-buttons-hover)"
          buttonsActiveColor="var(--color-secondary-buttons-active)"
          buttonsTextColor="var(--color-secondary-text)"
          componentHeight="40px"
          componentWidth="98%"
          inputTextColor="var(--color-secondary-text)"
          inputColor="var(--color-secondary-text-inputs)"
          inputBorderColor="var(--color-secondary-text-inputs-border)"
          submitButtonIcon={AcceptIcon}
          submitButtonColor="var(--color-secondary-buttons-darker)"
          submitButtonHoverColor="var(--color-secondary-buttons-darker-hover)"
          helpHoverStore={helpHoverStore}
        />

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
            <section className="flex flex-col h-auto min-h-[100px] max-h-[400px] overflow-auto w-[98%] px-[2%] pb-1 mb-1 gap-1">
              {filteredElements.map((el) => (
                <PhenotypesTableRow
                  phenotypeId={el.id}
                  phenotypeName={el.name}
                  isSelected={el.id === currentPhenotype.id}
                  changeActivePhenotype={(id: number) =>
                    liveModelServ.Control.changeCurrentlyActivePhenotype(id)
                  }
                  helpHoverStore={helpHoverStore}
                />
              ))}
            </section>
          )}
        />
      </SectionWithDotHeader>
    </div>
  );
};

export default PhenotypesOverlayContent;
