import type { ModelEditorInt } from '../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { ModelEditorStatus } from '../../../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type FloatMenuProps = {
  modelEditorServ: ModelEditorInt;
  modelEditorStatusStore: ZustandStore<ModelEditorStatus>;
};
