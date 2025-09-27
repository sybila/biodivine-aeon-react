import FloatMenuButton from '../FloatMenuButton/FloatMenuButton';

import EditNameIcon from '../../../../../assets/icons/edit.svg';
import EditFunctionIcon from '../../../../../assets/icons/functions.svg';
import DeleteIcon from '../../../../../assets/icons/delete-24px.svg';
import type { VariableMenuButtonsProps } from './VariableMenuButtonsProps';
import { LiveModel } from '../../../../../services/global/LiveModel/LiveModel';

const VariableMenuButtons: React.FC<VariableMenuButtonsProps> = ({
  setHint,
  selectedVariableId,
}) => {
  return (
    <div className="flex flex-row h-auto w-[99%] items-center">
      <FloatMenuButton
        iconSrc={EditNameIcon}
        iconAlt="E"
        onClick={() => console.log('todo open popup')}
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
        onClick={() => LiveModel.Variables.removeVariable(selectedVariableId)}
        hintText="Remove (⌫)"
        setHintText={setHint}
      />
    </div>
  );
};

export default VariableMenuButtons;
