import { useMemo, useState } from 'react';
import type { Oscillation, PhenotypeStats } from '../../../../types';
import SeparatorLine from '../../global/SeparatorLine/SeparatorLine';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import type { ControlEditorTabContentProps } from './PhenotypeEditorTabContentProps';
import PhenotypeOscillationButton from './PhenotypeOscillationButton/PhenotypeOscillationButton';
import PhenotypeStatsTable from './PhenotypeStatsTable/PhenotypeStatsTable';
import PhenotypeVariablesTable from './PhenotypeVariablesTable/PhenotypeVariablesTable';

const ControlEditorTabContent: React.FC<ControlEditorTabContentProps> = ({
  phenotypeEditorServ,
  searchAndFilterHelpersServ,
  pageStringProviderServ,
  loadingServ,

  controlStore,
  variablesStore,
  modelEditorStatusStore,
  helpHoverStore,
}) => {
  const currentPhenotype = controlStore((state) => state.currentPhenotype);
  const [oscillationValue, setOscillationValue] = useState<Oscillation>(
    phenotypeEditorServ.getPhenotypeOscillation()
  );

  const currentPhenotypeStats: PhenotypeStats = useMemo(
    () => controlStore.getState().getPhenotypeStats(),
    [currentPhenotype]
  );

  return (
    <div className="flex flex-col items-center w-full h-fit gap-3">
      <section className="flex flex-col items-center w-full h-fit gap-3">
        <DotHeaderReact
          textColor="var(--color-primary-text)"
          compWidth="100%"
          headerText="Phenotypes"
          justifyHeader="start"
        />

        <TextButtonReact
          compWidth="100%"
          compHeight="40px"
          handleClick={() => phenotypeEditorServ.openPhenotypesOverlayWindow()}
          text="Show Available Phenotypes"
        />
      </section>

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
                  currentPhenotype.name,
                  true,
                  -50,
                  50
                )
            }
            onMouseLeave={() => helpHoverStore.getState().clear()}
          >
            {currentPhenotype.name}
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

export default ControlEditorTabContent;
