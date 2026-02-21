import type { TabInfo, TabType } from '../../types';

export type TabsState = {
  /** Property containing information about all opened tabs. */
  openedTabs: Record<number, TabInfo>;
  /** Property containing the ID of the next created tab. */
  idNow: number;
  /** Adds a new tab. */
  addTab: (
    path: string,
    type: TabType,
    onClick?: () => void,
    onClose?: () => void
  ) => number;
  /** Removes a tab by ID. */
  removeTab: (id: number) => void;
  /** Sets the active tab by ID. */
  setActiveTab: (id: number, navigate?: boolean) => void;
  /** Retrieves all opened tabs. */
  getAllTabs: () => TabInfo[];
  /** Retrieves a tab by ID. */
  getTabById: (id: number) => TabInfo | undefined;
  /** Retrieves the first tab with a specific type. */
  getFirstTabWithType: (type: TabType) => TabInfo | undefined;
  /** Retrieves the currently active tab. */
  getActiveTab: () => TabInfo | undefined;
  /** Checks if there are any opened tabs except for the Model Editor Tab. */
  isEmpty: () => boolean;
  /** Clears all opened tabs. Except for the Model Editor Tab */
  clear: () => void;
};
