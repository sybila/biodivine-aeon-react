import type { ModelEditorPageStringsInt } from '../../../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { ControlEnabledEditorInt } from '../../../../../../services/model-editor/ControlEditor/ControlEnabledEditor/ControlEnabledEditorInt';
import type { HelpHoverState } from '../../../../../../stores/HelpHover/HelpHoverState';
import type { ControlStatus } from '../../../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { ZustandStore } from '../../../../../../stores/ZustandStoreType';

export type VariableControlEnabledInfoProps = {
  id: number;
  name: string;
  hover: boolean;
  selected: boolean;
  toggleSelect: (variableId: number) => void;

  controlEnabledEditorServ: ControlEnabledEditorInt;
  pageStringProviderServ: ModelEditorPageStringsInt;

  controlStore: ZustandStore<ControlStatus>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
