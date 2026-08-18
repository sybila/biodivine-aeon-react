import type { ComputationModes, TabType } from '../../../types/types';

import AttractorBifurcationExplorerIcon from '../../../assets/icons/attractor-bifurcation-explorer.svg';
import AttractorVisualizerIcon from '../../../assets/icons/attractor-visualizer.svg';
import ControlPerturbationsTableIcon from '../../../assets/icons/control-perturbations-table.svg';
import ModelEditorIcon from '../../../assets/icons/model-editor.svg';
import WitnessIcon from '../../../assets/icons/witness.svg';
import type { TabsState } from '../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import type { TabOperationsInt } from './TabOperationsInt';

/** Class containing methods for operations on navigation tabs */
class TabOperations implements TabOperationsInt {
  // #region --- Properties + Constructor ---

  /** A set of tab types that can only be opened as a single instance. */
  private singleTabTypes: Set<TabType> = new Set<TabType>([
    'Attractor Bifurcation Explorer',
    'Control Perturbations Table',
  ]);

  private tabTypeToIcon: Record<TabType, string> = {
    'Model Editor': ModelEditorIcon,
    'Attractor Bifurcation Explorer': AttractorBifurcationExplorerIcon,
    'Attractor Visualizer': AttractorVisualizerIcon,
    Witness: WitnessIcon,
    'Control Perturbations Table': ControlPerturbationsTableIcon,
  };

  constructor(tabsStore: ZustandStore<TabsState>) {
    tabsStore.getState().canOpenMoreThanOneFunction = (tabType: TabType) => {
      return this.canOpenMoreThanOne(tabType);
    };
  }

  // #endregion

  /** Determines if more than one instance of a tab can be opened. */
  public canOpenMoreThanOne(tabType: TabType): boolean {
    return !this.singleTabTypes.has(tabType);
  }

  /** Returns the icon for a given tab type */
  public getTabTypeIcon(tabType: TabType): string {
    return this.tabTypeToIcon[tabType] ?? '';
  }

  /** Returns the tab types associated with a given computation mode */
  public getTabTypeFromComputationMode(mode: ComputationModes): Array<TabType> {
    switch (mode) {
      case 'Attractor Analysis':
        return ['Attractor Bifurcation Explorer', 'Attractor Visualizer'];
      case 'Control':
        return ['Control Perturbations Table'];
      default:
        return [];
    }
  }
}

export default TabOperations;
