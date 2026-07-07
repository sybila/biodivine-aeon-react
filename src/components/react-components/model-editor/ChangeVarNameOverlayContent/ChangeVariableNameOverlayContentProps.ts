import type { ModelEditorPageStringsInt } from '../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { ModelEditorInt } from '../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type ChangeVariableNameOverlayContentProps = {
  varId: number;
  originalName: string;
  closeFunction: () => void;

  modelEditorServ: ModelEditorInt;
  pageStringProviderServ: ModelEditorPageStringsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
