import type { ExportLMInt } from '../../../../services/global/LiveModel/ExportLM/ExportLMInt';
import type { ImportLMInt } from '../../../../services/global/LiveModel/ImportLM/ImportLMInt';
import type { MessageInt } from '../../../../services/global/Message/MessageInt';
import type { ModelEditorPageStringsInt } from '../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { TextEditorInt } from '../../../../services/model-editor/TextEditor/TextEditorInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type TextEditorTabContentProps = {
  textEditorServ: TextEditorInt;
  importLmServ: ImportLMInt;
  exportLmServ: ExportLMInt;
  messageServ: MessageInt;
  pageStringProviderServ: ModelEditorPageStringsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
