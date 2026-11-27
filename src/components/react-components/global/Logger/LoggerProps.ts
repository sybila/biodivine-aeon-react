import type { LoggerOtherStringsInt } from '../../../../services/global/StringProvider/common-other-strings/Logger/LoggerOtherStringsInt';
import type { LoggerTooltipsInt } from '../../../../services/global/StringProvider/common-tooltips/Logger/LoggerTooltipsInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type LoggerProps = {
  /** Lines to show. */
  lines: string[];
  /** Optional callback for clearing the log; shows a Clear button when provided. */
  onClear?: () => void;

  tooltips: LoggerTooltipsInt;
  otherStrings: LoggerOtherStringsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
