import type { LiveModelInt } from '../../../../services/global/LiveModel/LiveModelInt';
import type { LoadingInt } from '../../../../services/global/Loading/LoadingInt';
import type { ControlEditorInt } from '../../../../services/model-editor/ControlEditor/ControlEditorInt';
import type { SearchAndFilterHelpersInt } from '../../../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import type { ControlStatus } from '../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type ControlEditorTabContentProps = {
  liveModelServ: LiveModelInt;
  controlEditorServ: ControlEditorInt;
  searchAndFilterHelpersServ: SearchAndFilterHelpersInt;
  loadingServ: LoadingInt;

  controlStore: ZustandStore<ControlStatus>;
  variablesStore: ZustandStore<VariablesStatus>;
  modelEditorStatusStore: ZustandStore<ModelEditorStatus>;
};
