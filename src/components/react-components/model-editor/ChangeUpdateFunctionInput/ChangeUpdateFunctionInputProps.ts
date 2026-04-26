import type { ModelEditorInt } from '../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { UpdateFunctionsState } from '../../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type ChangeUpdateFunctionInputProps = {
  compHeight: string;
  compWidth: string;
  inputMinHeight: string;
  inputMaxHeight: string;
  inputWidth: string;
  inputFontSize: string;
  validationMinHeight: string;
  validationMaxHeight: string;
  varId: number;
  modelEditorServ: ModelEditorInt;
  variablesStore: ZustandStore<VariablesStatus>;
  updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
};
