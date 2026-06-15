import VariableNameInput from '../VariableNameInput/VariableNameInput';
import type { ChangeVariableNameOverlayContentProps } from './ChangeVariableNameOverlayContentProps';

const ChangeVarNameOverlayContent: React.FC<
  ChangeVariableNameOverlayContentProps
> = ({ varId, modelEditorServ, variablesStore }) => {
  const varName = variablesStore.getState().variables[varId]?.name ?? '';

  return (
    <div className="flex justify-center items-center h-[20vh] w-[50vw]">
      <VariableNameInput
        height="20vh"
        width="50vw"
        fontSize="25px"
        varId={varId}
        varName={varName}
        onUpdate={(id: number, newName: string) =>
          modelEditorServ.changeVariableName(id, newName)
        }
      />
    </div>
  );
};

export default ChangeVarNameOverlayContent;
