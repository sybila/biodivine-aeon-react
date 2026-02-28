import type { ControlEditorInt } from '../../../../../../services/model-editor/ControlEditor/ControlEditorInt';
import type { ControlStatus } from '../../../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { ZustandStore } from '../../../../../../stores/ZustandStoreType';

export type VariableControlInfoProps = {
  id: number;
  name: string;
  hover: boolean;
  selected: boolean;
  toggleSelect: (variableName: string) => void;
  controlEditorServ: ControlEditorInt;
  controlStore: ZustandStore<ControlStatus>;
};
