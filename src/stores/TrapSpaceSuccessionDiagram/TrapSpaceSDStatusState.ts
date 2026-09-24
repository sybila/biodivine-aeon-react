import type {
  AttractorClassArray,
  ContentVisibleComponent,
  DecisionsTSSD,
  MenuTabButton,
  MenuTabTypeTrapSpaceSD,
  MenuTabTypeTrapSpaceSDNotNull,
  NodeDataTSSDWithMotifs,
  StableMotifInfo,
  VisualizationStatus,
} from '../../types/types';

type SelectedItemTSSD =
  | { type: 'node'; data: NodeDataTSSDWithMotifs }
  | { type: 'edge'; data: StableMotifInfo };

/** Zustand Store which manages state of the Trap Space Succession Diagram page. */
export type TrapSpaceSDStatusState = {
  /** Currently saved visualization status. If null, no status is saved. (for example, when the page was newly created) */
  visualizationStatus: VisualizationStatus | null;
  /** Active menu tab inside the Trap Space Succession Diagram page. */
  activeMenuTab: MenuTabTypeTrapSpaceSD;

  selectedItem: SelectedItemTSSD | null;
  /** Decisions available for the selected node */
  availableDecisions: DecisionsTSSD | null;
  /** Attractor Behavior Classes computed for the selected item. */
  computedAttractorClasses: Array<AttractorClassArray> | null;

  /** Reference to the menu tab buttons. */
  menuTabButtonsRef: Partial<
    Record<MenuTabTypeTrapSpaceSDNotNull, MenuTabButton>
  >;

  /** Reference to the utilities menu component. */
  utilitiesMenuRef: ContentVisibleComponent | null;
  /** Setter for the reference to the utilities menu component. */
  setUtilitiesMenuRef: (ref: ContentVisibleComponent) => void;

  /** Sets the reference to a menu tab button.
   *  @param tab - The menu tab type.
   *  @param el - The HTML button element, or null to clear the reference.
   */
  setMenuTabButtonRef: (
    tab: MenuTabTypeTrapSpaceSDNotNull,
    el: MenuTabButton | null
  ) => void;

  setVisualizationStatus: (status: VisualizationStatus) => void;
  setAvailableDecisions: (decisions: DecisionsTSSD) => void;
  setComputedAttractorClasses: (attractorClasses: Array<AttractorClassArray>) => void;
  setActiveMenuTab: (tab: MenuTabTypeTrapSpaceSD) => void;
  changeSelectedItem: (node: SelectedItemTSSD | null) => void;
  /** Clears the information about the selected item. (sets selectedItem to null) */
  clearSelectedItemInfo: () => void;
};
