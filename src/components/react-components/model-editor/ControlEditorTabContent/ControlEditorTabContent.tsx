import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import ControlStatsTable from './ControStatsTable/ControlStatsTable';

import ControlVariablesTable from './ControlVariablesTable/ControlVariablesTable';

const ControlEditorTabContent: React.FC = () => {
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
