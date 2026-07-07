import type { ModelEditorPageStringsInt } from '../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { ModelEditorInt } from '../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type { UpdateFunctionStatus } from '../../../../types';

export type ChangeUpdateFunctionInputProps = {
  compHeight: string;
  compWidth: string;
  inputHeight: string;
  inputWidth: string;
  inputFontSize: string;
  validationMinHeight: string;
  validationMaxHeight: string;
  varName: string;
  updateFunction: string;
  updateFunctionStatus: UpdateFunctionStatus;
  setUpdateFunction: (fun: string) => void;
  exposeInputRef: (reference: HTMLElement) => void;

  modelEditorServ: ModelEditorInt;
  pageStringProviderServ: ModelEditorPageStringsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
