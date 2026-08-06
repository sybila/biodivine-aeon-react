import type { ExportLMInt } from '../../../../services/global/LiveModel/ExportLM/ExportLMInt';
import type { ImportLMInt } from '../../../../services/global/LiveModel/ImportLM/ImportLMInt';
import type { TextEditorInt } from '../../../../services/model-editor/TextEditor/TextEditorInt';

export type TextEditorTabContentProps = {
  textEditorServ: TextEditorInt;
  importLmServ: ImportLMInt;
  exportLmServ: ExportLMInt;
};
