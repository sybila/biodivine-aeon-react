import type { ModelEditorInt } from '../../../../services/model-editor/ModelEditor/ModelEditorInt';

export type ChangeVariableNameOverlayContentProps = {
  varId: number;
  originalName: string;
  closeFunction: () => void;

  modelEditorServ: ModelEditorInt;
};
