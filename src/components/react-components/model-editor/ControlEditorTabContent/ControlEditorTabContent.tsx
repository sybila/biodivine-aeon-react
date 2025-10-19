import { useState } from 'react';
import type { Oscillation } from '../../../../types';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import ControlStatsTable from './ControStatsTable/ControlStatsTable';

import ControlVariablesTable from './ControlVariablesTable/ControlVariablesTable';
import PhenotypeOscillationButton from './PhenotypeOscillationButton/PhenotypeOscillationButton';
import ControlEditor from '../../../../services/model-editor/ControlEditor/ControlEditor';

const ControlEditorTabContent: React.FC = () => {
  const [oscillationValue, setOscillationValue] = useState<Oscillation>(
    ControlEditor.getPhenotypeOscillation()
  );

  return (
    <div className="flex flex-col items-center w-full h-fit gap-3">
      <section className="flex flex-col items-center w-full h-fit gap-3">
        <DotHeaderReact
          headerText="Control Statistics"
          compWidth="100%"
          justifyHeader="start"
        />

        <ControlStatsTable />
      </section>

      <section className="flex flex-col items-center w-full h-fit gap-3">
        <DotHeaderReact
          headerText="Phenotype Oscillation"
          compWidth="100%"
          justifyHeader="start"
        />

        <PhenotypeOscillationButton
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

      <ControlVariablesTable />
    </div>
  );
};

export default ControlEditorTabContent;
