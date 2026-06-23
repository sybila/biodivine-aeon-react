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
  varId,
  exposeInputRef,

  modelEditorServ,
  pageStringProviderServ,

  variablesStore,
  updateFunctionsStore,
  helpHoverStore,
}) => {
  const inputReference = useRef<InvisibleInput | null>(null);

  const varName = variablesStore(
    (state) => state.variables[varId].name ?? 'Unknown'
  );

  const updateFunction = updateFunctionsStore(
    (state) => state.getUpdateFunctionId(varId)?.functionString ?? ''
  );
  const updateFunctionStatus = updateFunctionsStore(
    (state) => state.updateFunctionStatus[varId] ?? ''
  );

  const changeUpdateFunction = (newFunction: string) => {
    const updateFunction: string = newFunction ?? '';

    modelEditorServ.setUpdateFunction(varId, updateFunction);
  };

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
        handleChange={changeUpdateFunction}
        handleSubmit={changeUpdateFunction}
        textColor="var(--base-text-color)"
        placeholderColor="var(--placeholder-text-color)"
        onMouseEnter={handleUpdateFunctionMouseEnter}
        onMouseLeave={handleUpdateFunctionMouseLeave}
      />
      <UpdateFunctionValidation
        compMinHeight={validationMinHeight}
        compMaxHeight={validationMaxHeight}
        compWidth={'95%'}
        updateFunctionStatus={updateFunctionStatus}
      />
    </div>
  );
};

export default ChangeUpdateFunctionInput;
