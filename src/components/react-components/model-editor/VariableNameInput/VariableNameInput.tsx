import { useState } from 'react';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
import ModelEditor from '../../../../services/model-editor/ModelEditor/ModelEditor';

const VariableNameInput: React.FC<{
  height: string;
  width: string;
  singleFontSize: string;
  varId: number;
  varName: string;
}> = ({ height, width, singleFontSize, varId, varName }) => {
  const [nameError, setNameError] = useState<boolean>(
    !varName || varName === ''
  );
  const updateVariableName = (newName: string) => {
    if (!newName || newName === '') {
      setNameError(true);
      return;
    }

    const success = ModelEditor.changeVariableName(varId, newName);
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
