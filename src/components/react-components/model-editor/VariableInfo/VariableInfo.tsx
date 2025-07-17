import { useState } from 'react';
import ExtendableContentReact from '../../lit-wrappers/ExtendableContent';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
import type { VariableInfoProps } from './VariableInfoProps';

const VariableInfo: React.FC<VariableInfoProps> = ({ varName }) => {
  const [name, setName] = useState<string>(varName);
  const [nameError, setNameError] = useState<boolean>(
    !varName || varName === ''
  );

  const updateVariableName = (name: string) => {
    if (!name || name === '') {
      setNameError(true);
      return;
    }

    setName(name);
    setNameError(false);
  };

  return (
    <ExtendableContentReact compWidth="100%">
      <InvisibleInputReact
        slot="top-content"
        compHeight="100%"
        compWidth="60%"
        value={name}
        placeholder="(variable name)"
        error={nameError}
        handleChange={updateVariableName}
      ></InvisibleInputReact>
    </ExtendableContentReact>
  );
};

export default VariableInfo;
