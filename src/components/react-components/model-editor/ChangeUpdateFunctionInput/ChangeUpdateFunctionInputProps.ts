import type { ModelEditorPageStringsInt } from '../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { ModelEditorInt } from '../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { UpdateFunctionsState } from '../../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type ChangeUpdateFunctionInputProps = {
  compHeight: string;
  compWidth: string;
  inputHeight: string;
  inputWidth: string;
  inputFontSize: string;
  validationMinHeight: string;
  validationMaxHeight: string;
  varId: number;
  exposeInputRef: (reference: HTMLElement) => void;

  modelEditorServ: ModelEditorInt;
  pageStringProviderServ: ModelEditorPageStringsInt;

  variablesStore: ZustandStore<VariablesStatus>;
  updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
