import useVariablesStore from '../../../../stores/LiveModel/useVariablesStore';
import VariableNameInput from '../VariableNameInput/VariableNameInput';

const ChangeVarNameOverlayContent: React.FC<{ varId: number }> = ({
  varId,
}) => {
  const varName = useVariablesStore.getState().variables[varId]?.name ?? '';

  return (
    <div className="flex justify-center items-center h-[90px] w-[300px]">
      <div className="flex flex-row justify-center items-center h-[35px] w-[99%] bg-gray-200 rounded-[15px]">
        <VariableNameInput
          height="90%"
          width="90%"
          singleFontSize="25px"
          varId={varId}
          varName={varName}
        />
      </div>
    </div>
  );
};

export default ChangeVarNameOverlayContent;
