import type { ModelEditorInt } from '../../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { RegulationsStatus } from '../../../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { UpdateFunctionsState } from '../../../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../../../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type ModelEditorVariableTableProps = {
  searchText: string | undefined;
  modelEditorServ: ModelEditorInt;
  regulationsStore: ZustandStore<RegulationsStatus>;
  variablesStore: ZustandStore<VariablesStatus>;
  modelEditorStatusStore: ZustandStore<ModelEditorStatus>;
  updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
};
