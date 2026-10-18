import type { MessagesInt } from './Messages/MessagesInt';
import type { OtherStringsInt } from './OtherStrings/OtherStringsInt';
import type { TooltipsInt } from './Tooltips/TooltipsInt';

/** Class which provides strings for the Trap Space Succession Diagram Page. */
export interface TrapSpaceSDPageStringsInt {
  Tooltips: TooltipsInt;
  OtherStrings: OtherStringsInt;
  Messages: MessagesInt;

  helpText(): string;
}
