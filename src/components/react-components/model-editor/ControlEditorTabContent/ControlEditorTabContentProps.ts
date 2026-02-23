import type { LiveModelInt } from '../../../../services/global/LiveModel/LiveModelInt';
import type { ControlEditorInt } from '../../../../services/model-editor/ControlEditor/ControlEditorInt';
import type { ControlStatus } from '../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type ControlEditorTabContentProps = {
  liveModelServ: LiveModelInt;
  controlEditorServ: ControlEditorInt;
  controlStore: ZustandStore<ControlStatus>;
  variablesStore: ZustandStore<VariablesStatus>;
};
