import type { LiveModelInt } from '../../../../../services/global/LiveModel/LiveModelInt';
import type { ModelEditorInt } from '../../../../../services/model-editor/ModelEditor/ModelEditorInt';

export type VariableMenuButtonsProps = {
  setHint: (text: string) => void;
  selectedVariableId: number;
  liveModelServ: LiveModelInt;
  modelEditorServ: ModelEditorInt;
};
