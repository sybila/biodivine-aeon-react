import { useEffect, useRef } from 'react';
import type { InvisibleInput } from '../../../lit-components/invisible-input';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
import UpdateFunctionValidation from '../UpdateFunctionValidation/UpdateFunctionValidation';
import type { ChangeUpdateFunctionInputProps } from './ChangeUpdateFunctionInputProps';

const ChangeUpdateFunctionInput: React.FC<ChangeUpdateFunctionInputProps> = ({
  compHeight,
  compWidth,
  inputHeight,
  inputWidth,
  inputFontSize,
  validationMinHeight,
  validationMaxHeight,
  varName,
  updateFunction,
  updateFunctionStatus,
  setUpdateFunction,
  exposeInputRef,

  pageStringProviderServ,

  helpHoverStore,
}) => {
  const inputReference = useRef<InvisibleInput | null>(null);

  const handleUpdateFunctionMouseEnter = (e: React.MouseEvent) =>
    helpHoverStore
      .getState()
      .setHelpHoverAtMouse(
        e.nativeEvent,
        pageStringProviderServ.Tooltips.changeVariableUpdateFunction(),
        true,
        -150
      );
  const handleUpdateFunctionMouseLeave = () =>
    helpHoverStore.getState().clear();

  useEffect(() => {
    exposeInputRef(inputReference.current as HTMLElement);
  }, [inputReference]);

  return (
    <div
      style={{ height: compHeight, width: compWidth }}
      className="flex flex-col justify-center items-center"
    >
      <InvisibleInputReact
        ref={inputReference}
        compHeight={inputHeight}
        compWidth={inputWidth}
        fontSize={inputFontSize}
        multiLine={true}
        placeholder={pageStringProviderServ.OtherStrings.updateFunctionInputPlaceholder(
          varName
        )}
        value={updateFunction}
        handleKeyUp={(fun) => setUpdateFunction(fun)}
        contBgColor='transparent'
        textColor="var(--color-secondary-text)"
        contFocusBgColor="transparent"
        placeholderColor="var(--color-secondary-placeholder-text)"
        onMouseEnter={handleUpdateFunctionMouseEnter}
        onMouseLeave={handleUpdateFunctionMouseLeave}
      />
      <UpdateFunctionValidation
        compMinHeight={validationMinHeight}
        compMaxHeight={validationMaxHeight}
        compWidth={'95%'}
        textColor='var(--color-secondary-text)'
        updateFunctionStatus={updateFunctionStatus}
      />
    </div>
  );
};

export default ChangeUpdateFunctionInput;
