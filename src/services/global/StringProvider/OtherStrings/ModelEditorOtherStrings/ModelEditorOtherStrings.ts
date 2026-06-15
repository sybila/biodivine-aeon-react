import type { ModelEditorOtherStringsInt } from './ModelEditorOtherStringsInt';

class ModelEditorOtherStrings implements ModelEditorOtherStringsInt {
  /** Returns the placeholder for the update function input of a variable. */
  updateFunctionInputPlaceholder(variableName: string): string {
    return `$f_${variableName ?? 'Unknown Variable'}(...)`;
  }
}

export default ModelEditorOtherStrings;
