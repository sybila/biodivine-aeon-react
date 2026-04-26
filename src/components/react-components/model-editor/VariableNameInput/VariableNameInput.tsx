import { useState } from 'react';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
import type { VariableNameInputProps } from './VariableNameInputProps';

const VariableNameInput: React.FC<VariableNameInputProps> = ({
  height,
  width,
  fontSize,
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
      contMinHeight={height}
      contMaxHeight={height}
      contMinWidth={width}
      contMaxWidth={width}
      textBoxMinWidth={width}
      textBoxMaxWidth={width}
      textBoxMaxHeight={height}
      textBoxMinHeight={height}
      fontSize={fontSize}
      value={varName}
      placeholder="(variable name)"
      error={nameError}
      handleChange={updateVariableName}
    />
  );
};

export default VariableNameInput;
