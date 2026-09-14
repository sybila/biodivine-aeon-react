import type { TabType } from '../../../types/types';

/** Class for managing keyboard shortcuts. Each page should have its own set of shortcuts.
 * 
 * Example code snippet of how to enable shortcuts on page:
 *
 *   useEffect(() => {
 *
     shortcutManagerServ?.setShortcuts('Model Editor');
 
     return () => {

       shortcutManagerServ?.clearShortcuts();
       
     };
   }, []);
 */
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
