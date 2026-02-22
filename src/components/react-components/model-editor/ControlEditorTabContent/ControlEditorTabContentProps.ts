import type { ControlEditorInt } from '../../../../services/model-editor/ControlEditor/ControlEditorInt';
import type { ControlStatus } from '../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type ControlEditorTabContentProps = {
  controlEditorServ: ControlEditorInt;
  controlStore: ZustandStore<ControlStatus>;
};
