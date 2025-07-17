import { useState } from 'react';
import ExtendableContentReact from '../../lit-wrappers/ExtendableContent';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
import type { Variable } from '../../../../types';
import IconButtonReact from '../../lit-wrappers/IconButtonReact';

import SearchIcon from '../../../../assets/icons/search-24px.svg';
import DeleteIcon from '../../../../assets/icons/delete-24px.svg';

const VariableInfo: React.FC<Variable> = ({
  id,
  name,
  controllable,
  phenotype,
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

  return (
    <ExtendableContentReact
      compWidth="100%"
      topOverflowX="visible"
      topOverflowY="visible"
      topContentOverflowX="visible"
      topContentOverflowY="visible"
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

      <section slot="top-content" className='flex justify-around items-center h-full w-[15%]'>
        <IconButtonReact
          compHeight="100%"
          buttonBorderRadius="8px"
          iconSize="90%"
          iconSrc={SearchIcon}
          iconAlt="find"
        ></IconButtonReact>

        <IconButtonReact
          compHeight="100%"
          buttonBorderRadius="8px"
          iconSize="90%"
          iconSrc={DeleteIcon}
          iconAlt="delete"
        ></IconButtonReact>
      </section>
    </ExtendableContentReact>
  );
};

export default VariableInfo;
