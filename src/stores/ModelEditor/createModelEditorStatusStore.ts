import { create } from 'zustand';
import type { VisualizationZoomStatus } from '../../types/types';
import type { ZustandStore } from '../ZustandStoreType';
import type { ModelEditorStatus } from './ModelEditorStatus';

function createModelEditorStatusStore(): ZustandStore<ModelEditorStatus> {
  return create<ModelEditorStatus>((set) => ({
    selectedItemsInfo: { variables: new Set<number>(), regulations: {} },
    addSelectedItemInfo: (itemInfo) => {
      if (itemInfo.type === 'variable') {
        set((state) => {
          const newVariableSet = new Set(state.selectedItemsInfo.variables);
          newVariableSet.add(itemInfo.id);
          return {
            selectedItemsInfo: {
              ...state.selectedItemsInfo,
              variables: newVariableSet,
            },
          };
        });
      } else if (itemInfo.type === 'regulation') {
        set((state) => {
          const newRegulationRecord =
            state.selectedItemsInfo.regulations[itemInfo.regulationIds.target];
          if (!newRegulationRecord) {
            return {
              selectedItemsInfo: {
                ...state.selectedItemsInfo,
                regulations: {
                  ...state.selectedItemsInfo.regulations,
                  [itemInfo.regulationIds.target]: new Set([
                    itemInfo.regulationIds.regulator,
                  ]),
                },
              },
            };
          }
          const updatedRegulationRecord = new Set(newRegulationRecord);
          updatedRegulationRecord.add(itemInfo.regulationIds.regulator);
          return {
            selectedItemsInfo: {
              ...state.selectedItemsInfo,
              regulations: {
                ...state.selectedItemsInfo.regulations,
                [itemInfo.regulationIds.target]: updatedRegulationRecord,
              },
            },
          };
        });
      }
    },

    removeSelectedItemInfo: (itemInfo) => {
      if (itemInfo.type === 'variable') {
        set((state) => {
          const newVariableSet = new Set(state.selectedItemsInfo.variables);
          newVariableSet.delete(itemInfo.id);
          return {
            selectedItemsInfo: {
              ...state.selectedItemsInfo,
              variables: newVariableSet,
            },
          };
        });
      } else if (itemInfo.type === 'regulation') {
        set((state) => {
          const newRegulationRecord =
            state.selectedItemsInfo.regulations[itemInfo.regulationIds.target];
          if (!newRegulationRecord) {
            return state; // No regulation to remove
          }
          const updatedRegulationRecord = new Set(newRegulationRecord);
          updatedRegulationRecord.delete(itemInfo.regulationIds.regulator);
          const newRegulationInfo = {
            ...state.selectedItemsInfo.regulations,
            [itemInfo.regulationIds.target]: updatedRegulationRecord,
          };
          // If the updated regulation record is empty, remove the target entry
          if (updatedRegulationRecord.size === 0) {
            delete newRegulationInfo[itemInfo.regulationIds.target];
          }
          return {
            selectedItemsInfo: {
              ...state.selectedItemsInfo,
              regulations: newRegulationInfo,
            },
          };
        });
      }
    },
    clearSelectedItemsInfo: () =>
      set({
        selectedItemsInfo: { variables: new Set<number>(), regulations: {} },
      }),
    hoverItemInfo: null,
    setHoverItemInfo: (itemInfo) => set({ hoverItemInfo: itemInfo }),
    scrollToVariable: null,
    setScrollToVariable: (variableId) => set({ scrollToVariable: variableId }),
    clearScrollToVariable: () => set({ scrollToVariable: null }),
    menuTabButtonsRef: {},
    setMenuTabButtonRef: (tab, el) =>
      set((state) => ({
        menuTabButtonsRef: {
          ...state.menuTabButtonsRef,
          [tab]: el,
        },
      })),
    utilitiesMenuRef: null,
    setUtilitiesMenuRef: (ref) => set({ utilitiesMenuRef: ref }),
    globalSearchRef: null,
    setGlobalSearchRef: (ref) => set({ globalSearchRef: ref }),
    floatingMenuInfo: null,
    setFloatingMenuInfo: (info) => set({ floatingMenuInfo: info }),
    visualizationZoomStatus: null,
    setVisualizationZoomStatus: (zoomStatus: VisualizationZoomStatus) => {
      set({
        visualizationZoomStatus: {
          minZoom: zoomStatus.minZoom,
          maxZoom: zoomStatus.maxZoom,
          currentZoom:
            zoomStatus.currentZoom < zoomStatus.minZoom
              ? zoomStatus.minZoom
              : zoomStatus.currentZoom > zoomStatus.maxZoom
                ? zoomStatus.maxZoom
                : zoomStatus.currentZoom,
        },
      });
    },
    clear: () => {
      set({
        selectedItemsInfo: { variables: new Set<number>(), regulations: {} },
        hoverItemInfo: null,
        floatingMenuInfo: null,
        scrollToVariable: null,
      });
    },
  }));
}

export default createModelEditorStatusStore;
