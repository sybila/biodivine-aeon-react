import { useState } from 'react';
import type { Oscillation } from '../../../../types';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import ControlStatsTable from './ControStatsTable/ControlStatsTable';

import type { ControlEditorTabContentProps } from './ControlEditorTabContentProps';
import ControlVariablesTable from './ControlVariablesTable/ControlVariablesTable';
import PhenotypeOscillationButton from './PhenotypeOscillationButton/PhenotypeOscillationButton';

const ControlEditorTabContent: React.FC<ControlEditorTabContentProps> = ({
  liveModelServ,
  controlEditorServ,
  searchAndFilterHelpersServ,
  controlStore,
  variablesStore,
}) => {
  const [oscillationValue, setOscillationValue] = useState<Oscillation>(
    controlEditorServ.getPhenotypeOscillation()
  );

  return (
    <div className="flex flex-col items-center w-full h-fit gap-3">
      <section className="flex flex-col items-center w-full h-fit gap-3">
        <DotHeaderReact
          headerText="Control Statistics"
          compWidth="100%"
          justifyHeader="start"
        />

        <ControlStatsTable
          liveModelServ={liveModelServ}
          controlStore={controlStore}
        />
      </section>

      <section className="flex flex-col items-center w-full h-fit gap-3">
        <DotHeaderReact
          headerText="Phenotype Oscillation"
          compWidth="100%"
          justifyHeader="start"
        />

        <PhenotypeOscillationButton
          controlEditorServ={controlEditorServ}
          oscillationValue={oscillationValue}
          setOscillationValue={setOscillationValue}
          compWidth="95%"
        />
      </section>

      <section className="flex flex-row items-around w-full h-fit gap-1">
        <DotHeaderReact
          compWidth="50%"
          headerText="Variables"
          justifyHeader="start"
        />
      </section>

      <ControlVariablesTable
        controlEditorServ={controlEditorServ}
        searchAndFilterHelpersServ={searchAndFilterHelpersServ}
        variablesStore={variablesStore}
        controlStore={controlStore}
      />
    </div>
  );
};

export default ControlEditorTabContent;
