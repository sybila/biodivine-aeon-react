import type { LiveModelInt } from '../../../../../services/global/LiveModel/LiveModelInt';
import type { EditorFloatMenuInt } from '../../../../../services/global/StringProvider/ModelEditorPageStrings/OtherStrings/EditorFloatMenu/EditorFloatMenuInt';
import type { ModelEditorInt } from '../../../../../services/model-editor/ModelEditor/ModelEditorInt';

export type VariableMenuButtonsProps = {
  setHint: (text: string) => void;
  selectedVariableId: number;
  liveModelServ: LiveModelInt;
  modelEditorServ: ModelEditorInt;
  floatMenuStringsServ: EditorFloatMenuInt;
};
