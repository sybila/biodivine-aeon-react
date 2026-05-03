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

  stringProviderServ,

  helpHoverStore,
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

  const handleMouseEnter = (e: React.MouseEvent) =>
    helpHoverStore
      .getState()
      .setHelpHoverAtMouse(
        e.nativeEvent,
        varName.length > 0
          ? varName
          : stringProviderServ.ToolTips.ModelEditorTooltips.changeVariableName(),
        true,
        -50
      );
  const handleMouseLeave = () => helpHoverStore.getState().clear();

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default VariableNameInput;
