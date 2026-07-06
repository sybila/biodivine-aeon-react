import { useEffect, useRef } from 'react';
import { InvisibleInput } from '../../../lit-components/invisible-input';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
import type { VariableNameInputProps } from './VariableNameInputProps';

const VariableNameInput: React.FC<VariableNameInputProps> = ({
  height,
  width,
  fontSize,
  varName,
  nameError,
  exposeInputRef,
  onKeyUp,
}) => {
  const inputRef = useRef<InvisibleInput | null>(null);

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
      handleKeyUp={(newName: string) => onKeyUp(newName)}
    />
  );
};

export default VariableNameInput;
