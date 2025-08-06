import { useCallback, useEffect, useState } from 'react';
import ModelEditor from '../../../../services/model-editor/ModelEditor/ModelEditor';
import type { Variable } from '../../../../types';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import TextInputReact from '../../lit-wrappers/TextInputReact';
import VariableInfo from './VariableInfo/VariableInfo';
import { useMemo } from 'react';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import useVariablesStore from '../../../../stores/LiveModel/useVariablesStore';
import ModelStatsTable from './ModelStatsTable/ModelStatsTable';
import useModelInfoStore from '../../../../stores/LiveModel/useModelInfoStore';
import TextIconButtonReact from '../../lit-wrappers/TextIconButtonReact';

import AddIcon from '../../../../assets/icons/add_box.svg';

const ModelEditorTabContent: React.FC = () => {
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(
    ModelEditor.getSelectedVariableId()
  );
  const [variableSearchText, setVariableSearchText] = useState<string>(
    ModelEditor.getVariableSearch()
  );

  const [showModelDescription, setShowModelDescription] =
    useState<boolean>(false);

  const modelDescription = useModelInfoStore((state) =>
    state.getModelDescription()
  );

  const variablesObj = useVariablesStore((state) => state.variables);
  const variables = Object.values(variablesObj);

  const hoverVariableInfo = useCallback((id: number, turnOnHover: boolean) => {
    setHoverId(turnOnHover ? id : null);
  }, []);

  const selectVariableInfo = useCallback((id: number, select: boolean) => {
    setSelectedId(select ? id : null);
  }, []);

  useEffect(() => {
    ModelEditor.setSelectVariableFunction(selectVariableInfo);
    ModelEditor.setHoverVariableFunction(hoverVariableInfo);
  }, [hoverVariableInfo, selectVariableInfo]);

  const setVariableSearch = (name: string) => {
    if (name !== variableSearchText) {
      ModelEditor.setVariableSearch(name);
      setVariableSearchText(name);
    }
  };

  const filterVariable = (variable: Variable) => {
    return (
      variableSearchText === '' || variable.name.startsWith(variableSearchText)
    );
  };

  const filteredVariables = useMemo(() => {
    if (variableSearchText === '') return variables;
    return variables.filter(filterVariable);
  }, [variables, variableSearchText]);

  const insertVariables = () => {
    if (!filteredVariables || filteredVariables.length === 0) {
      return (
        <section className="flex h-[200px] w-[98%] justify-center items-center">
          <SimpleHeaderReact
            headerText="No Variables"
            textFontWeight="normal"
          />
        </section>
      );
    }

    return (
      <section className="flex flex-col min-h-[50px] h-auto max-h-[100px] md:max-h-[200px] xl:max-h-[300px] 2xl:max-h-[400px] overflow-auto w-[98%] px-[2%] pb-1 mb-1 gap-1">
        {filteredVariables.map((variable: Variable) => (
          <VariableInfo
            key={variable.id}
            {...variable}
            hover={hoverId === variable.id}
            selected={selectedId === variable.id}
          />
        ))}
      </section>
    );
  };

  return (
    <div className="flex flex-col items-center w-full h-fit gap-3">
      {showModelDescription ? (
        <InvisibleInputReact
          compHeight="200px"
          compWidth="100%"
          placeholder="(model description)"
          multiTextAlign="start"
          multiFontSize="14px"
          multiLine={true}
          value={modelDescription}
          handleChange={(value) => {
            ModelEditor.setModelDescription(value);
          }}
        />
      ) : null}

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
            text={`${showModelDescription ? 'Hide' : 'Show'} Model description`}
            handleClick={() => setShowModelDescription(!showModelDescription)}
            active={showModelDescription}
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

      {insertVariables()}
    </div>
  );
};

export default ModelEditorTabContent;
