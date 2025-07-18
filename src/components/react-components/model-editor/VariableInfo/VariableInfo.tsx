import { useState } from 'react';
import ExtendableContentReact from '../../lit-wrappers/ExtendableContent';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
import IconButtonReact from '../../lit-wrappers/IconButtonReact';

import ModelEditor from '../../../../services/model-editor/ModelEditor/ModelEditor';

import SearchIcon from '../../../../assets/icons/search-24px.svg';
import DeleteIcon from '../../../../assets/icons/delete-24px.svg';
import type { VariableInfoProps } from './VariableInfoProps';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import type { Regulation } from '../../../../types';
import RegulationInfo from '../RegulationInfo/RegulationInfo';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';

const VariableInfo: React.FC<VariableInfoProps> = ({
  id,
  name,
  controllable,
  phenotype,
  hover,
  selected,
}) => {
  const [varName, setVarName] = useState<string>(name);
  const [nameError, setNameError] = useState<boolean>(
    !varName || varName === ''
  );

  const updateVariableName = (newName: string) => {
    if (!newName || newName === '') {
      setNameError(true);
      return;
    }

    setVarName(newName);
    setNameError(false);
  };

  const insertRegulators = () => {
    const regulations = ModelEditor.getVariableRegulators(id);

    if (regulations.length === 0) {
      return (
        <section
          slot="extended-content"
          className="flex justify-center items-center h-[40px] max-h-[40px] w-full"
        >
          <SimpleHeaderReact
            compHeight='20px'
            headerText="No Regulators"
            textFontSize='15px'
            textFontFamily="FiraMono, monospace"
            textFontWeight="normal"
          ></SimpleHeaderReact>
        </section>
      );
    }

    return (
      <section
        slot="extended-content"
        className="h-auto max-h-[100px] w-full overflow-auto"
      >
        {regulations.map((regulation: Regulation) => (
          <RegulationInfo {...regulation}></RegulationInfo>
        ))}
      </section>
    );
  };

  return (
    <ExtendableContentReact
      compWidth="100%"
      topOverflowX="visible"
      topOverflowY="visible"
      topContentOverflowX="visible"
      topContentOverflowY="visible"
      hover={hover}
      active={selected}
      handleMouseEnter={() => ModelEditor.hoverVariableCytoscape(id, true)}
      handleMouseLeave={() => ModelEditor.hoverVariableCytoscape(id, false)}
    >
      <InvisibleInputReact
        slot="top-content"
        compHeight="100%"
        compWidth="60%"
        value={varName}
        placeholder="(variable name)"
        error={nameError}
        handleChange={updateVariableName}
      ></InvisibleInputReact>

      <section
        slot="top-content"
        className="flex justify-around items-center h-full w-[15%]"
      >
        <IconButtonReact
          compHeight="100%"
          buttonBorderRadius="8px"
          iconSize="90%"
          iconSrc={SearchIcon}
          iconAlt="find"
          handleClick={() => ModelEditor.zoomOnVariable(id)}
        ></IconButtonReact>

        <IconButtonReact
          compHeight="100%"
          buttonBorderRadius="8px"
          iconSize="90%"
          iconSrc={DeleteIcon}
          iconAlt="delete"
          handleClick={() => ModelEditor.removeVariable(id)}
        ></IconButtonReact>
      </section>

      <DotHeaderReact
        slot="extended-content"
        headerText="Regulators"
        compWidth="100%"
        justifyHeader="start"
        textFontSize="12px"
      ></DotHeaderReact>

      {insertRegulators()}
    </ExtendableContentReact>
  );
};

export default VariableInfo;
