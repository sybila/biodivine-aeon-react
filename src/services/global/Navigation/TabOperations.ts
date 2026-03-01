import type { TabType } from '../../../types';

import AttractorBifurcationExplorerIcon from '../../../assets/icons/attractor-bifurcation-explorer.svg';
import AttractorVisualizerIcon from '../../../assets/icons/attractor-visualizer.svg';
import ControlPerturbationsTableIcon from '../../../assets/icons/control-perturbations-table.svg';
import ModelEditorIcon from '../../../assets/icons/model-editor.svg';
import WitnessIcon from '../../../assets/icons/witness.svg';
import type { TabOperationsInt } from './TabOperationsInt';

/** Class containing methods for operations on navigation tabs */
class TabOperationsClass implements TabOperationsInt {
  // #region --- Properties ---

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

  // #endregion

  /** Determines if more than one instance of a tab can be opened. */
  public canOpenMoreThanOne(tabType: TabType): boolean {
    return !this.singleTabTypes.has(tabType);
  }

  /** Returns the icon for a given tab type */
  public getTabTypeIcon(tabType: TabType): string {
    return this.tabTypeToIcon[tabType] ?? '';
  }
}

const TabOperations = new TabOperationsClass();

export default TabOperations;
