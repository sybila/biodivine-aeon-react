import type { StringProviderInt } from '../../../../services/global/StringProvider/StringProviderInt';
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

  modelEditorServ: ModelEditorInt;
  stringProviderServ: StringProviderInt;

  variablesStore: ZustandStore<VariablesStatus>;
  updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
