import type { ModelEditorStatus } from '../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../stores/ZustandStoreType';

export type ModelEditorProps = {
  modelEditorStatusStore: ZustandStore<ModelEditorStatus>;
};
