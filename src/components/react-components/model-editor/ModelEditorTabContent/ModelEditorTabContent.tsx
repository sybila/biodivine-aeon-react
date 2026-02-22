import { useState } from 'react';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import TextIconButtonReact from '../../lit-wrappers/TextIconButtonReact';
import TextInputReact from '../../lit-wrappers/TextInputReact';
import ModelStatsTable from './ModelStatsTable/ModelStatsTable';

import AddIcon from '../../../../assets/icons/add_box.svg';
import { LiveModel } from '../../../../services/global/LiveModel/LiveModel';
import ModelDescription from './ModelDescription/ModelDescription';
import type { ModelEditorTabContentProps } from './ModelEditorTabContentProps';
import ModelEditorVariableTable from './ModelEditorVariableTable/ModelEditorVariableTable';
import ModelName from './ModelName/ModelName';

const ModelEditorTabContent: React.FC<ModelEditorTabContentProps> = ({
  modelEditorServ,
  regulationsStore,
  variablesStore,
  updateFunctionsStore,
  tabStore,
  modelInfoStore,
}) => {
  const [variableSearchText, setVariableSearchText] = useState<string>(
    modelEditorServ.getVariableSearch()
  );
  const [showModelDescription, setShowModelDescription] =
    useState<boolean>(false);

  const setVariableSearch = (name: string) => {
    if (name !== variableSearchText) {
      modelEditorServ.setVariableSearch(name);
      setVariableSearchText(name);
    }
  };

  LiveModel.UpdateFunctions.validateUpdateFunctionsIfNeeded();

  return (
    <div className="flex flex-col items-center w-full h-fit gap-3">
      <ModelName
        modelEditorServ={modelEditorServ}
        tabStore={tabStore}
        modelInfoStore={modelInfoStore}
      />
      {showModelDescription ? (
        <ModelDescription
          setShowModelDescription={setShowModelDescription}
          modelEditorServ={modelEditorServ}
        />
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

            <ModelStatsTable
              regulationsStore={regulationsStore}
              updateFunctionsStore={updateFunctionsStore}
              variablesStore={variablesStore}
            />
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
                modelEditorServ.addVariable();
              }}
            />
          </section>

          <TextInputReact
            compWidth="95%"
            placeholder="Search variables..."
            onWrite={setVariableSearch}
            value={variableSearchText}
          />

          <ModelEditorVariableTable
            searchText={variableSearchText}
            modelEditorServ={modelEditorServ}
            regulationsStore={regulationsStore}
            variablesStore={variablesStore}
          />
        </>
      )}
    </div>
  );
};

export default ModelEditorTabContent;
