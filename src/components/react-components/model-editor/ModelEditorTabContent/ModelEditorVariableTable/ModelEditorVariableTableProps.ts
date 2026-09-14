import type { ModelEditorPageStringsInt } from '../../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { ModelEditorInt } from '../../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { SearchAndFilterHelpersInt } from '../../../../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { RegulationsStatus } from '../../../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { UpdateFunctionsState } from '../../../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../../../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type ModelEditorVariableTableProps = {
  searchText: string | undefined;
  exposeSetExtend: (extendFunction: (extend: boolean) => void) => void;

  modelEditorServ: ModelEditorInt;
  searchAndFilterHelpersServ: SearchAndFilterHelpersInt;
  pageStringProviderServ: ModelEditorPageStringsInt;

  regulationsStore: ZustandStore<RegulationsStatus>;
  variablesStore: ZustandStore<VariablesStatus>;
  modelEditorStatusStore: ZustandStore<ModelEditorStatus>;
  updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
