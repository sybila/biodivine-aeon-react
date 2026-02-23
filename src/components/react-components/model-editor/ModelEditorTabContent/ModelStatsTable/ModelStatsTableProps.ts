import type { ModelEditorInt } from '../../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { RegulationsStatus } from '../../../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { UpdateFunctionsState } from '../../../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type ModelStatsTableProps = {
  modelEditorServ: ModelEditorInt;
  regulationsStore: ZustandStore<RegulationsStatus>;
  updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
  variablesStore: ZustandStore<VariablesStatus>;
};
