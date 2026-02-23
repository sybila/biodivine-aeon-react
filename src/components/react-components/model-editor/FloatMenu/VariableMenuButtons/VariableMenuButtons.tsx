import DeleteIcon from '../../../../../assets/icons/delete-24px.svg';
import EditNameIcon from '../../../../../assets/icons/edit.svg';
import EditFunctionIcon from '../../../../../assets/icons/functions.svg';
import FloatMenuButton from '../FloatMenuButton/FloatMenuButton';
import type { VariableMenuButtonsProps } from './VariableMenuButtonsProps';

const VariableMenuButtons: React.FC<VariableMenuButtonsProps> = ({
  setHint,
  selectedVariableId,
  liveModelServ,
  modelEditorServ,
}) => {
  return (
    <div className="flex flex-row h-auto w-[99%] items-center">
      <FloatMenuButton
        iconSrc={EditNameIcon}
        iconAlt="E"
        onClick={() =>
          modelEditorServ.openChangeVarNameWindow(selectedVariableId)
        }
        hintText="Edit name (E)"
        setHintText={setHint}
      />
      <FloatMenuButton
        iconSrc={EditFunctionIcon}
        iconAlt="F"
        onClick={() =>
          modelEditorServ.openChangeUpdateFunctionWindow(selectedVariableId)
        }
        hintText="Edit update function (F)"
        setHintText={setHint}
      />
      <FloatMenuButton
        iconSrc={DeleteIcon}
        iconAlt="⌫"
        onClick={async () =>
          await liveModelServ.Variables.removeVariableWithWarnings(
            selectedVariableId
          )
        }
        hintText="Remove (⌫)"
        setHintText={setHint}
      />
    </div>
  );
};

export default VariableMenuButtons;
