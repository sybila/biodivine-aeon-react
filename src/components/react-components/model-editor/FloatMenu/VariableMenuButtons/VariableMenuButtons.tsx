import DeleteIcon from '../../../../../assets/icons/delete-24px.svg';
import EditNameIcon from '../../../../../assets/icons/edit.svg';
import EditFunctionIcon from '../../../../../assets/icons/functions.svg';
import SearchIcon from '../../../../../assets/icons/search-24px.svg';
import FloatMenuButton from '../FloatMenuButton/FloatMenuButton';
import type { VariableMenuButtonsProps } from './VariableMenuButtonsProps';

const VariableMenuButtons: React.FC<VariableMenuButtonsProps> = ({
  setHint,
  selectedVariableId,
  liveModelServ,
  modelEditorServ,
  floatMenuStringsServ,
}) => {
  return (
    <div className="flex flex-row h-auto w-[99%] items-center">
      <FloatMenuButton
        iconSrc={EditNameIcon}
        iconAlt="R"
        onClick={() =>
          modelEditorServ.openChangeVarNameWindow(selectedVariableId)
        }
        hintText={floatMenuStringsServ.editVarName()}
        setHintText={setHint}
      />
      <FloatMenuButton
        iconSrc={EditFunctionIcon}
        iconAlt="F"
        onClick={() =>
          modelEditorServ.openChangeUpdateFunctionWindow(selectedVariableId)
        }
        hintText={floatMenuStringsServ.editUpdateFunction()}
        setHintText={setHint}
      />
      <FloatMenuButton
        iconSrc={DeleteIcon}
        iconAlt="D"
        onClick={async () =>
          await liveModelServ.Variables.removeVariableWithWarnings(
            selectedVariableId,
            true
          )
        }
        hintText={floatMenuStringsServ.removeVar()}
        setHintText={setHint}
      />

      <FloatMenuButton
        iconSrc={SearchIcon}
        iconAlt="S"
        onClick={() =>
          modelEditorServ.scrollVariableIntoView(selectedVariableId)
        }
        hintText={floatMenuStringsServ.findVarInMenu()}
        setHintText={setHint}
      />
    </div>
  );
};

export default VariableMenuButtons;
