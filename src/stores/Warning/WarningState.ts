import type { TextButton, Warning } from '../../types';

export type WarningState = {
  /** Head of the linked list of warnings. If null, there are no warnings. */
  warningLinkedList: Warning | null;
  /** Adds a new warning to the linked list. */
  addWarning: (message: string, buttons: TextButton[]) => void;
  /** Removes the head warning from the linked list and returns it. */
  popWarning: () => Warning | null;
  /** Clears all warnings from the linked list. */
  clear: () => void;
};
