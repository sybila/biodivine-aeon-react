import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import { useState } from 'react';
import ControlStatsTable from './ControStatsTable/ControlStatsTable';
import TextInputReact from '../../lit-wrappers/TextInputReact';
import ControlEditor from '../../../../services/model-editor/ControlEditor/ControlEditor';
import ControlVariablesTable from './ControlVariablesTable/ControlVariablesTable';

const ControlEditorTabContent: React.FC = () => {
  const [variableSearchText, setVariableSearchText] = useState<string>(
    ControlEditor.getVariableSearch()
  );

  const setVariableSearch = (name: string) => {
    if (name !== variableSearchText) {
      ControlEditor.setVariableSearch(name);
      setVariableSearchText(name);
    }
  };

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

      <TextInputReact
        compWidth="95%"
        placeholder="Search variables..."
        onWrite={setVariableSearch}
        value={variableSearchText}
      />

      <ControlVariablesTable searchText={variableSearchText} />
    </div>
  );
};

export default ControlEditorTabContent;
