import type { ModelEditorInt } from '../../../../services/model-editor/ModelEditor/ModelEditorInt';

export type ChangeUpdateFunctionInputProps = {
  compHeight: string;
  compWidth: string;
  inputHeight: string;
  inputWidth: string;
  inputFontSize: string;
  validationMinHeight: string;
  validationMaxHeight: string;
  varId: number;
  modelEditorServ: ModelEditorInt;
};
