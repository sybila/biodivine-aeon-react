import type { OtherStringsInt } from './OtherStrings/OtherStringsInt';
import type { TooltipsInt } from './Tooltips/TooltipsInt';

/** Class which provides strings for the Model Editor Page. */
export interface ModelEditorPageStringsInt {
  Tooltips: TooltipsInt;
  OtherStrings: OtherStringsInt;

  helpTextModelEditor(): string;
  helpTextWitness(): string;
}
