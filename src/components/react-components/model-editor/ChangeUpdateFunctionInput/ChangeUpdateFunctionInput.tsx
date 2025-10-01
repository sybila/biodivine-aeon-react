import ModelEditor from '../../../../services/model-editor/ModelEditor/ModelEditor';
import useUpdateFunctionsStore from '../../../../stores/LiveModel/useUpdateFunctionsStore';
import useVariablesStore from '../../../../stores/LiveModel/useVariablesStore';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';

const ChangeUpdateFunctionInput: React.FC<{
  compHeight: string;
  compWidth: string;
  inputHeight: string;
  inputWidth: string;
  inputFontSize: string;
  validationMinHeight: string;
  validationMaxHeight: string;
  varId: number;
}> = ({
  compHeight,
  compWidth,
  inputHeight,
  inputWidth,
  inputFontSize,
  validationMinHeight,
  validationMaxHeight,
  varId,
}) => {
  const varName = useVariablesStore(
    (state) => state.variables[varId].name ?? 'Unknown'
  );

  const updateFunction = useUpdateFunctionsStore(
    (state) => state.getUpdateFunctionId(varId)?.functionString ?? ''
  );
  const updateFunctionStatus = useUpdateFunctionsStore(
    (state) => state.updateFunctionStatus[varId] ?? ''
  );

  const changeUpdateFunction = (newFunction: string) => {
    const updateFunction: string = newFunction ?? '';

    ModelEditor.setUpdateFunction(varId, updateFunction);
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
