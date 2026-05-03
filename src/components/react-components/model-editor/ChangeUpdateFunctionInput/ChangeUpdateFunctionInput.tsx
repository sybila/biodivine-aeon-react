import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
import type { ChangeUpdateFunctionInputProps } from './ChangeUpdateFunctionInputProps';

const ChangeUpdateFunctionInput: React.FC<ChangeUpdateFunctionInputProps> = ({
  compHeight,
  compWidth,
  inputMinHeight,
  inputMaxHeight,
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
        -80
      );
  const handleUpdateFunctionMouseLeave = () =>
    helpHoverStore.getState().clear();

  return (
    <div
      style={{ height: compHeight, width: compWidth }}
      className="flex flex-col justify-center items-center"
    >
      <InvisibleInputReact
        contMinHeight={inputMinHeight}
        contMaxHeight={inputMaxHeight}
        contMinWidth={inputWidth}
        contMaxWidth={inputWidth}
        textBoxMinHeight={inputMinHeight}
        textBoxMaxHeight={inputMaxHeight}
        textBoxMinWidth={inputWidth}
        textBoxMaxWidth={inputWidth}
        fontSize={inputFontSize}
        multiLine={true}
        placeholder={`$f_${varName}(...)`}
        value={updateFunction}
        handleChange={changeUpdateFunction}
        textColor="var(--base-text-color)"
        placeholderColor="var(--placeholder-text-color)"
        onMouseEnter={handleUpdateFunctionMouseEnter}
        onMouseLeave={handleUpdateFunctionMouseLeave}
      />
      <span
        className="min-h-[20px] w-[95%] mt-1.5 overflow-x-auto overflow-y-auto font-(family-name:--font-family-fira-mono) select-none leading-[18px] text-[15px] whitespace-pre-line"
        style={{
          color: updateFunctionStatus.isError ? 'var(--color-red)' : 'black',
          minHeight: validationMinHeight,
          maxHeight: validationMaxHeight,
        }}
      >
        {updateFunctionStatus.status}
      </span>
    </div>
  );
};

export default ChangeUpdateFunctionInput;
