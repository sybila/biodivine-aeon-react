import EditorFloatMenu from './EditorFloatMenu/EditorFloatMenu';
import type { OtherStringsInt } from './OtherStringsInt';

class OtherStrings implements OtherStringsInt {

  public EditorFloatMenu = new EditorFloatMenu();

  /** Returns the placeholder for the update function input of a variable. */
  updateFunctionInputPlaceholder(variableName: string): string {
    return `$f_${variableName ?? 'Unknown Variable'}(...)`;
  }
}

export default OtherStrings;
