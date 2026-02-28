import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
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
  variablesStore,
  updateFunctionsStore,
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

  return (
    <div
      style={{ height: compHeight, width: compWidth }}
      className="flex flex-col justify-center items-center"
    >
      <InvisibleInputReact
        compHeight={inputHeight}
        compWidth={inputWidth}
        multiFontSize={inputFontSize}
        multiLine={true}
        placeholder={`$f_${varName}(...)`}
        value={updateFunction}
        handleChange={changeUpdateFunction}
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
