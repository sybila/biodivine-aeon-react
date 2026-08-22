import { useMemo, useState } from 'react';
import type { Oscillation, PhenotypeStats } from '../../../../types/types';
import SectionWithDotHeader from '../../global/SectionWithDotHeader/SectionWithDotHeader';
import SeparatorLine from '../../global/SeparatorLine/SeparatorLine';
import ContentWindowReact from '../../lit-wrappers/ContentWindowReact';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import type { PhenotypeEditorTabContentProps } from './PhenotypeEditorTabContentProps';
import PhenotypeOscillationButton from './PhenotypeOscillationButton/PhenotypeOscillationButton';
import PhenotypeStatsTable from './PhenotypeStatsTable/PhenotypeStatsTable';
import PhenotypeVariablesTable from './PhenotypeVariablesTable/PhenotypeVariablesTable';

const PhenotypeEditorTabContent: React.FC<PhenotypeEditorTabContentProps> = ({
  phenotypeEditorServ,
  searchAndFilterHelpersServ,
  pageStringProviderServ,
  messageServ,
  loadingServ,

  controlStore,
  variablesStore,
  modelEditorStatusStore,
  helpHoverStore,
}) => {
  const editedPhenotype = controlStore(
    (state) => state.currentlyEditedPhenotype
  );

  const phenotypeInComputation = controlStore(
    (state) => state.phenotypesUsedInComputation
  );
  const phenotypes = controlStore((state) => state.phenotypes);

  const phenotypesAsString = useMemo(() => {
    let nameString = '';

    phenotypeInComputation.forEach((phenId) => {
      if (phenotypes[phenId]) {
        nameString += `${nameString.length < 1 ? '' : ' ,'}${phenotypes[phenId].name}`;
      }
    });

    return nameString;
  }, [phenotypes, phenotypeInComputation]);

  const [oscillationValue, setOscillationValue] = useState<Oscillation>(
    phenotypeEditorServ.getPhenotypeOscillation()
  );

  const currentPhenotypeStats: PhenotypeStats = useMemo(
    () => controlStore.getState().getPhenotypeStats(),
    [editedPhenotype]
  );

  return (
    <div className="flex flex-col items-center w-full h-fit gap-3">
      <SectionWithDotHeader
        textColor="var(--color-primary-text)"
        text="Phenotypes"
      >
        <TextButtonReact
          compWidth="100%"
          compHeight="40px"
          handleClick={() => phenotypeEditorServ.openPhenotypesOverlayWindow()}
          text="Show Available Phenotypes"
        />
      </SectionWithDotHeader>

      <SectionWithDotHeader
        textColor="var(--color-primary-text)"
        text="Used For Computations"
      >
        <ContentWindowReact
          compHeight="40px"
          compWidth="99%"
          contentAlignI="safe center"
          contentJustifyC="center"
          windOverflowY="hidden"
          windColor="var(--color-secondary-light)"
        >
          <div className="flex flex-row h-full w-auto font-(--base-font-family) text-(--color-secondary-text) select-none px-2">
            {phenotypesAsString}
          </div>
        </ContentWindowReact>
      </SectionWithDotHeader>

      <SeparatorLine color="var(--color-primary-separator)" />

      <section className="flex flex-col items-center w-full h-fit gap-3">
        <DotHeaderReact
          textColor="var(--color-primary-text)"
          headerText="Currently Edited Phenotype"
          textFontWeight="bold"
          textTransform="uppercase"
          compWidth="100%"
          justifyHeader="start"
        />

        <div className="flex flex-col gap-3 h-fit w-full bg-(--color-secondary) rounded-md p-2">
          <span
            className="h-fit pb-1 px-2 w-full bg-(--color-tertiary-lighter) text-center select-none overflow-hidden text-(--color-secondary-text) text-[20px] font-(family-name:--font-family-fira-mono) rounded-md text-ellipsis"
            onMouseEnter={(e: React.MouseEvent) =>
              helpHoverStore
                .getState()
                .setHelpHoverAtMouse(
                  e.nativeEvent,
                  editedPhenotype.name,
                  true,
                  -50,
                  50
                )
            }
            onMouseLeave={() => helpHoverStore.getState().clear()}
          >
            {editedPhenotype.name}
          </span>

          <section className="flex flex-col items-center w-full h-fit gap-3">
            <DotHeaderReact
              textColor="var(--color-secondary-text)"
              headerText="Phenotype Statistics"
              compWidth="100%"
              justifyHeader="start"
            />

            <PhenotypeStatsTable stats={currentPhenotypeStats} />
          </section>

          <section className="flex flex-col items-center w-full h-fit gap-3">
            <DotHeaderReact
              textColor="var(--color-secondary-text)"
              headerText="Phenotype Oscillation"
              compWidth="100%"
              justifyHeader="start"
            />

            <PhenotypeOscillationButton
              phenotypeEditorServ={phenotypeEditorServ}
              oscillationValue={oscillationValue}
              setOscillationValue={setOscillationValue}
              compWidth="95%"
              pageStringProviderServ={pageStringProviderServ}
              helpHoverStore={helpHoverStore}
            />
          </section>

          <section className="flex flex-row items-around w-full h-fit gap-1">
            <DotHeaderReact
              textColor="var(--color-secondary-text)"
              compWidth="50%"
              headerText="Variables"
              justifyHeader="start"
            />
          </section>

          <PhenotypeVariablesTable
            phenotypeEditorServ={phenotypeEditorServ}
            searchAndFilterHelpersServ={searchAndFilterHelpersServ}
            pageStringProviderServ={pageStringProviderServ}
            messageServ={messageServ}
            loadingServ={loadingServ}
            variablesStore={variablesStore}
            controlStore={controlStore}
            modelEditorStatusStore={modelEditorStatusStore}
            helpHoverStore={helpHoverStore}
          />
        </div>
      </section>
    </div>
  );
};

export default PhenotypeEditorTabContent;
