import { useState } from 'react';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
import type { VariableNameInputProps } from './VariableNameInputProps';

const VariableNameInput: React.FC<VariableNameInputProps> = ({
  height,
  width,
  singleFontSize,
  varId,
  varName,
  onUpdate,
}) => {
  const [nameError, setNameError] = useState<boolean>(
    !varName || varName === ''
  );
  const updateVariableName = (newName: string) => {
    if (!newName || newName === '') {
      setNameError(true);
      return;
    }

    const success = onUpdate(varId, newName);
    setNameError(!success);
  };

  return (
    <InvisibleInputReact
      compHeight={height}
      compWidth={width}
      singleFontSize={singleFontSize}
      value={varName}
      placeholder="(variable name)"
      error={nameError}
      handleChange={updateVariableName}
    />
  );
};

export default VariableNameInput;
