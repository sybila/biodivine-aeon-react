/** Class for defining page-specific keyboard shortcuts.
 *  Each page should implement this interface to define its own shortcuts.
 */
export interface PageShortcutsInt {
  /** Applies the page-specific keyboard shortcuts based on the event.
   *  This method should handle the logic for each shortcut defined for the page.
   */
  applyShortcuts(event: KeyboardEvent): void;
}
