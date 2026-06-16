import type { ModelEditorPageStringsInt } from '../../../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { ControlEditorInt } from '../../../../../../services/model-editor/ControlEditor/ControlEditorInt';
import type { HelpHoverState } from '../../../../../../stores/HelpHover/HelpHoverState';
import type { ControlStatus } from '../../../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { ZustandStore } from '../../../../../../stores/ZustandStoreType';

export type VariableControlInfoProps = {
  id: number;
  name: string;
  hover: boolean;
  selected: boolean;
  toggleSelect: (variableId: number) => void;

  controlEditorServ: ControlEditorInt;
  pageStringProviderServ: ModelEditorPageStringsInt;

  controlStore: ZustandStore<ControlStatus>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
