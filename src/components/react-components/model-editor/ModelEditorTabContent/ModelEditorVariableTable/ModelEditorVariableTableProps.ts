import type { ModelEditorInt } from '../../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { RegulationsStatus } from '../../../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { VariablesStatus } from '../../../../../stores/LiveModel/VariableStore/VariablesStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type ModelEditorVariableTableProps = {
  searchText: string | undefined;
  modelEditorServ: ModelEditorInt;
  regulationsStore: ZustandStore<RegulationsStatus>;
  variablesStore: ZustandStore<VariablesStatus>;
};
