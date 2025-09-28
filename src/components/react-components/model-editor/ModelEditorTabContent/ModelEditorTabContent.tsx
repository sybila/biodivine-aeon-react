import { useState } from 'react';
import ModelEditor from '../../../../services/model-editor/ModelEditor/ModelEditor';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import TextInputReact from '../../lit-wrappers/TextInputReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import ModelStatsTable from './ModelStatsTable/ModelStatsTable';
import TextIconButtonReact from '../../lit-wrappers/TextIconButtonReact';

import AddIcon from '../../../../assets/icons/add_box.svg';
import ModelEditorVariableTable from './ModelEditorVariableTable/ModelEditorVariableTable';
import ModelDescription from './ModelDescription/ModelDescription';

const ModelEditorTabContent: React.FC = () => {
  const [variableSearchText, setVariableSearchText] = useState<string>(
    ModelEditor.getVariableSearch()
  );
  const [showModelDescription, setShowModelDescription] =
    useState<boolean>(false);

  const setVariableSearch = (name: string) => {
    if (name !== variableSearchText) {
      ModelEditor.setVariableSearch(name);
      setVariableSearchText(name);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-fit gap-3">
      {showModelDescription ? (
        <ModelDescription setShowModelDescription={setShowModelDescription} />
      ) : (
        <>
          <section className="flex flex-col items-center w-full h-fit gap-3">
            <section className="flex flex-row items-center justify-between w-full h-fit gap-1">
              <DotHeaderReact
                compWidth="60%"
                headerText="Model Statistics"
                justifyHeader="start"
              />

              <TextButtonReact
                className="mr-1"
                compWidth="35%"
                textFontSize="13px"
                text={`${
                  showModelDescription ? 'Hide' : 'Show'
                } Model description`}
                handleClick={() =>
                  setShowModelDescription(!showModelDescription)
                }
                active={false}
              />
            </section>

            <ModelStatsTable />
          </section>

          <section className="flex flex-row justify-between w-full h-[30px] gap-1">
            <DotHeaderReact
              compHeight="99%"
              compWidth="50%"
              headerText="Variables"
              justifyHeader="start"
            />
            <TextIconButtonReact
              className="mr-1"
              compHeight="90%"
              compWidth="30%"
              iconSrc={AddIcon}
              iconAlt="Add"
              iconHeight="19px"
              text="Add Variable"
              handleClick={() => {
                ModelEditor.addVariable();
              }}
            />
          </section>

          <TextInputReact
            compWidth="95%"
            placeholder="Search variables..."
            onWrite={setVariableSearch}
            value={variableSearchText}
          />

          <ModelEditorVariableTable searchText={variableSearchText} />
        </>
      )}
    </div>
  );
};

export default ModelEditorTabContent;
