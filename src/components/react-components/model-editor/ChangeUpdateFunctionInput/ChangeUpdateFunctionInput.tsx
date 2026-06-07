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

  modelEditorServ,
  stringProviderServ,

  variablesStore,
  updateFunctionsStore,
  helpHoverStore,
}) => {
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
        stringProviderServ.ToolTips.ModelEditorTooltips.changeVariableUpdateFunction(),
        true,
        -150
      );
  const handleUpdateFunctionMouseLeave = () =>
    helpHoverStore.getState().clear();

  return (
    <div
      style={{ height: compHeight, width: compWidth }}
      className="flex flex-col justify-center items-center"
    >
      <InvisibleInputReact
        compHeight={inputHeight}
        compWidth={inputWidth}
        fontSize={inputFontSize}
        multiLine={true}
        placeholder={stringProviderServ.OtherStrings.ModelEditorOtherStrings.updateFunctionInputPlaceholder(
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
