import { useEffect, useRef, useState } from 'react';
import { InvisibleInput } from '../../../lit-components/invisible-input';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
import type { VariableNameInputProps } from './VariableNameInputProps';

const VariableNameInput: React.FC<VariableNameInputProps> = ({
  height,
  width,
  fontSize,
  varId,
  varName,
  exposeInputRef,
  onUpdate,
}) => {
  const inputRef = useRef<InvisibleInput | null>(null);

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

  useEffect(() => {
    exposeInputRef(inputRef.current as HTMLElement);
  }, [inputRef]);

  return (
    <InvisibleInputReact
      ref={inputRef}
      compHeight={height}
      compWidth={width}
      contBgColor="var(--color-secondary)"
      contFocusBgColor="var(--color-highlight)"
      contBorderRadius="10px"
      contPadX="2px"
      contPadY="2px"
      multiLine={true}
      fontSize={fontSize}
      textColor="var(--base-text-color)"
      value={varName}
      placeholder="(variable name)"
      error={nameError}
      handleSubmit={updateVariableName}
      handleChange={updateVariableName}
    />
  );
};

export default VariableNameInput;
