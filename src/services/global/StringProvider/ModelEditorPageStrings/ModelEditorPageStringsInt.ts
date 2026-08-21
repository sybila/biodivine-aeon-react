import type { OtherStringsInt } from './OtherStrings/OtherStringsInt';
import type { TooltipsInt } from './Tooltips/TooltipsInt';

/** Class which provides strings for the Model Editor Page. */
export interface ModelEditorPageStringsInt {
  Tooltips: TooltipsInt;
  OtherStrings: OtherStringsInt;

  /** Help text for Model Editor page written in the markdown format. */
  helpTextModelEditor(): string;
  quickHelpHeaderModelEditor(): string;
  /** Quick help text written in the markdown format. */
  quickHelpModelEditor(): string;
  /** Help text for Witness page written in the markdown format. */
  helpTextWitness(): string;
}
