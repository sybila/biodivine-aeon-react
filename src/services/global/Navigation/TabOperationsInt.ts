import type { ComputationModes, TabType } from '../../../types/types';

/** Class defining for operations on navigation tabs */
export interface TabOperationsInt {
  /** Determines if more than one instance of a tab can be opened. */
  canOpenMoreThanOne(tabType: TabType): boolean;

  /** Returns the icon for a given tab type */
  getTabTypeIcon(tabType: TabType): string;

  /** Returns the tab types associated with a given computation mode */
  getTabTypeFromComputationMode(mode: ComputationModes): Array<TabType>;
}
