import type { TabInfo, TabType } from '../../types';

export type TabsState = {
  /** Property containing information about all opened tabs. */
  openedTabs: Record<number, TabInfo>;
  /** Property containing the ID of the next created tab. */
  idNow: number;

  /** OnClick function for the first tab. Needs to be set externally because od circular dependencies. (Possibly set to something like LiveModel.Models.loadModel(0))  */
  firstTabOnClick: () => void;

  /** Function which determines if more than one tab with inserted TabType can be opened. (true  if yes, else false) */
  canOpenMoreThanOneFunction: (type: TabType) => boolean;

  /** Function which starts the loading indicator. */
  startLoading: () => void;
  /** Function which ends the loading indicator. */
  endLoading: () => void;

  /** Adds a new tab. */
  addTab: (
    path: string,
    type: TabType,
    onClick?: () => void,
    onLeave?: () => void,
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
