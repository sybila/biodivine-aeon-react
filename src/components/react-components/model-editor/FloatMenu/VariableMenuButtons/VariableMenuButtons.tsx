import FloatMenuButton from '../FloatMenuButton/FloatMenuButton';
import EditNameIcon from '../../../../../assets/icons/edit.svg';
import EditFunctionIcon from '../../../../../assets/icons/functions.svg';
import DeleteIcon from '../../../../../assets/icons/delete-24px.svg';
import type { VariableMenuButtonsProps } from './VariableMenuButtonsProps';
import { LiveModel } from '../../../../../services/global/LiveModel/LiveModel';
import ModelEditor from '../../../../../services/model-editor/ModelEditor/ModelEditor';

const VariableMenuButtons: React.FC<VariableMenuButtonsProps> = ({
  setHint,
  selectedVariableId,
}) => {
  return (
    <div className="flex flex-row h-auto w-[99%] items-center">
      <FloatMenuButton
        iconSrc={EditNameIcon}
        iconAlt="E"
        onClick={() => ModelEditor.openChangeVarNameWindow(selectedVariableId)}
        hintText="Edit name (E)"
        setHintText={setHint}
      />
      <FloatMenuButton
        iconSrc={EditFunctionIcon}
        iconAlt="F"
        onClick={() => console.log('Button 2 clicked')}
        hintText="Edit update function (F)"
        setHintText={setHint}
      />
      <FloatMenuButton
        iconSrc={DeleteIcon}
        iconAlt="⌫"
        onClick={async () =>
          await LiveModel.Variables.removeVariableWithWarnings(
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
