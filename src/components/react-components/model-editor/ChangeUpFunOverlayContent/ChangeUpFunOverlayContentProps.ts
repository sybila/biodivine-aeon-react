import type { ModelEditorPageStringsInt } from '../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { ModelEditorInt } from '../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { RegulationsStatus } from '../../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { UpdateFunctionsState } from '../../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type { UpdateFunctionStatus } from '../../../../types/types';

export type ChangeUpFunOverlayContentProps = {
  varId: number;
  varName: string;
  originalUpdateFunction: string;
  originalUpdateFunctionStatus: UpdateFunctionStatus;
  validateUpdateFunctionFun: (
    setStatus: (status: UpdateFunctionStatus) => void,
    updateFunction: string
  ) => void;
  closeFunction: () => void;

  modelEditorServ: ModelEditorInt;
  pageStringProviderServ: ModelEditorPageStringsInt;

  regulationsStore: ZustandStore<RegulationsStatus>;
  variablesStore: ZustandStore<VariablesStatus>;
  updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
