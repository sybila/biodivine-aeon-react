import { useState } from 'react';
import type { Oscillation } from '../../../../types';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
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
  const [oscillationValue, setOscillationValue] = useState<Oscillation>(
    phenotypeEditorServ.getPhenotypeOscillation()
  );

  return (
    <div className="flex flex-col items-center w-full h-fit gap-3">
      <section className="flex flex-col items-center w-full h-fit gap-3">
        <DotHeaderReact
          textColor="var(--color-primary-text)"
          headerText="Control Statistics"
          compWidth="100%"
          justifyHeader="start"
        />

        <PhenotypeStatsTable controlStore={controlStore} />
      </section>

      <section className="flex flex-col items-center w-full h-fit gap-3">
        <DotHeaderReact
          textColor="var(--color-primary-text)"
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
          textColor="var(--color-primary-text)"
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
  );
};

export default ControlEditorTabContent;
