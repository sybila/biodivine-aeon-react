import { useState } from 'react';
import ExtendableContentReact from '../../lit-wrappers/ExtendableContent';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
import type { Variable } from '../../../../types';

const VariableInfo: React.FC<Variable> = ({ id, name, controllable, phenotype }) => {
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
    <ExtendableContentReact compWidth="100%">
      <InvisibleInputReact
        slot="top-content"
        compHeight="100%"
        compWidth="60%"
        value={varName}
        placeholder="(variable name)"
        error={nameError}
        handleChange={updateVariableName}
      ></InvisibleInputReact>
    </ExtendableContentReact>
  );
};

export default VariableInfo;
