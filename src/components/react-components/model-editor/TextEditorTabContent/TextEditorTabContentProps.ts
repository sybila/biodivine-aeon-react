import type { ExportLMInt } from '../../../../services/global/LiveModel/ExportLM/ExportLMInt';
import type { ImportLMInt } from '../../../../services/global/LiveModel/ImportLM/ImportLMInt';

export type TextEditorTabContentProps = {
  importLmServ: ImportLMInt;
  exportLmServ: ExportLMInt;
};
