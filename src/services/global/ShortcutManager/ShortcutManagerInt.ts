import type { TabType } from '../../../types';

/** Class for managing keyboard shortcuts. Each page should have its own set of shortcuts. */
export interface ShortcutManagerInt {
  /** Sets up the keyboard shortcuts for the specified page type.
   *  @param pageType - The type of the page for which to set up the shortcuts.
   */
  setShortcuts(pageType: TabType): void;

  /** Cleans up the keyboard shortcuts for the specified page type.
   */
  clearShortcuts(): void;
}
``;
