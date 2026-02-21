import type { ControlEditorInt } from '../../../../../../services/model-editor/ControlEditor/ControlEditorInt';

export type VariableControlInfoProps = {
  id: number;
  name: string;
  hover: boolean;
  selected: boolean;
  toggleSelect: (variableName: string) => void;
  controlEditorServ: ControlEditorInt;
};
