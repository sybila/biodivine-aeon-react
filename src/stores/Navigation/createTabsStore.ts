import { create } from 'zustand';
import { Loading } from '../../components/lit-components/loading-wrapper';
import router from '../../router';
import type { TabInfo, TabType } from '../../types';
import type { ZustandStore } from '../ZustandStoreType';
import type { TabsState } from './TabState';

function createTabsStore(): ZustandStore<TabsState> {
  return create<TabsState>((set, get) => ({
    firstTabOnClick: () => {
      console.warn('First tab onClick not set');
    },
    canOpenMoreThanOneFunction: (_: TabType) => {
      console.warn('Can OpenMoreThanOneFunction not set');
      return false;
    },
    openedTabs: {
      0: {
        id: 0,
        path: '/model-editor',
        type: 'Model Editor',
        active: true,
        onClick: () => {
          get().firstTabOnClick();
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

      if (!get().canOpenMoreThanOneFunction(type)) {
        const existingTab = get().getFirstTabWithType(type);
        if (existingTab) {
          get().setActiveTab(existingTab.id);
          return existingTab.id;
        }
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

    getFirstTabWithType: (type: TabType) =>
      Object.values(get().openedTabs).find((tab) => tab.type === type),

    getActiveTab: () =>
      Object.values(get().openedTabs).find((tab) => tab.active),

    isEmpty: () => Object.keys(get().openedTabs).length === 1,

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
              get().firstTabOnClick();
            },
          },
        },
      });
    },
  }));
}

export default createTabsStore;
