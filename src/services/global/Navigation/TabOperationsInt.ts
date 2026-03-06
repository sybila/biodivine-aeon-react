import type { TabType } from '../../../types';

/** Class defining for operations on navigation tabs */
export interface TabOperationsInt {
  /** Determines if more than one instance of a tab can be opened. */
  canOpenMoreThanOne(tabType: TabType): boolean;

  /** Returns the icon for a given tab type */
  getTabTypeIcon(tabType: TabType): string;
}
