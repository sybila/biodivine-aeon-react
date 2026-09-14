import type { LiveModelInt } from '../../../../services/global/LiveModel/LiveModelInt';
import type { ModelEditorInt } from '../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { RegulationsStatus } from '../../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { ModelEditorStatus } from '../../../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type FloatMenuProps = {
  liveModelServ: LiveModelInt;
  modelEditorServ: ModelEditorInt;
  modelEditorStatusStore: ZustandStore<ModelEditorStatus>;
  regulationsStore: ZustandStore<RegulationsStatus>;
};
