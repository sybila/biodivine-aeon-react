import { create } from 'zustand';
import type { TabInfo, TabType } from '../../types';
import { LiveModel } from '../../services/global/LiveModel/LiveModel';
import router from '../../router';
import { Loading } from '../../components/lit-components/loading-wrapper';

type TabsState = {
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
  /** Checks if there are any opened tabs. */
  isEmpty: () => boolean;
  /** Clears all opened tabs. Except for the Model Editor Tab */
  clear: () => void;
};

const useTabsStore = create<TabsState>((set, get) => ({
  openedTabs: {
    0: {
      id: 0,
      path: '/model-editor',
      type: 'Model Editor',
      active: true,
      onClick: () => {
        LiveModel.Models.loadModel(0);
      },
    },
  },
  idNow: 1,

  addTab: (
    path: string,
    type: TabType,
    onClick?: () => void,
    onClose?: () => void
  ) => {
    if (type === 'Model Editor') {
      return 0;
    }

    const id = get().idNow;
    const newTab: TabInfo = {
      id,
      path,
      onClick,
      onClose,
      type,
      active: false,
    };
    set((state) => ({
      openedTabs: { ...state.openedTabs, [id]: newTab },
      idNow: state.idNow + 1,
    }));

    get().setActiveTab(id); // Set the newly created tab as active
    return id;
  },

  removeTab: (id: number) => {
    if (id === 0) {
      return;
    }

    const onClose = get().openedTabs[id]?.onClose;

    set((state) => {
      const newTabs = { ...state.openedTabs };

      if (newTabs[id].active) {
        get().setActiveTab(0); // Set Model Editor as active if the removed tab was active
      }

      delete newTabs[id];
      return { openedTabs: newTabs };
    });

    if (onClose) onClose();
  },

  setActiveTab: (id: number, navigate: boolean = true) => {
    Loading.startLoading();
    set((state) => {
      const newTabs = { ...state.openedTabs };
      Object.values(newTabs).forEach((tab) => {
        tab.active = tab.id === id;
      });
      return { openedTabs: newTabs };
    });

    const tab = get().openedTabs[id];

    if (tab?.onClick) tab.onClick();

    if (navigate && tab && tab.path) {
      router.navigate({ to: tab.path });
    }
    Loading.endLoading();
  },

  getAllTabs: () => Object.values(get().openedTabs),

  getTabById: (id: number) => get().openedTabs[id],

  isEmpty: () => Object.keys(get().openedTabs).length === 0,

  clear: () => {
    get()
      .getAllTabs()
      .forEach((tab) => {
        if (tab.id !== 0 && tab.onClose) {
          tab.onClose();
        }
      });
    set({
      openedTabs: {
        0: {
          id: 0,
          path: '/model-editor',
          type: 'Model Editor',
          active: true,
          onClick: () => {
            LiveModel.Models.loadModel(0);
          },
        },
      },
    });
  },
}));

export default useTabsStore;
