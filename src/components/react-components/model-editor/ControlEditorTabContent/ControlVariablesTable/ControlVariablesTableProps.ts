import type { LoadingInt } from '../../../../../services/global/Loading/LoadingInt';
import type { ControlEditorInt } from '../../../../../services/model-editor/ControlEditor/ControlEditorInt';
import type { SearchAndFilterHelpersInt } from '../../../../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import type { ControlStatus } from '../../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { VariablesStatus } from '../../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../../../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type ControlVariablesTableProps = {
  controlEditorServ: ControlEditorInt;
  searchAndFilterHelpersServ: SearchAndFilterHelpersInt;
  loadingServ: LoadingInt;

  variablesStore: ZustandStore<VariablesStatus>;
  controlStore: ZustandStore<ControlStatus>;
  modelEditorStatusStore: ZustandStore<ModelEditorStatus>;
};
