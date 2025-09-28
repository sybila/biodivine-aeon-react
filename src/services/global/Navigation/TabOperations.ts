import type { TabType } from '../../../types';

import ModelEditorIcon from '../../../assets/icons/model-editor.svg';
import AttractorBifurcationExplorerIcon from '../../../assets/icons/attractor-bifurcation-explorer.svg';
import AttractorVisualizerIcon from '../../../assets/icons/attractor-visualizer.svg';
import WitnessIcon from '../../../assets/icons/witness.svg';
import ControlPerturbationsTableIcon from '../../../assets/icons/control-perturbations-table.svg';

/** Class containing static methods over navigation tabs */
class TabOperations {
  // #region --- Properties ---

  /** A set of tab types that can only be opened as a single instance. */
  private static singleTabTypes: Set<TabType> = new Set<TabType>([
    'Attractor Bifurcation Explorer',
    'Control Perturbations Table',
  ]);

  private static tabTypeToIcon: Record<TabType, string> = {
    'Model Editor': ModelEditorIcon,
    'Attractor Bifurcation Explorer': AttractorBifurcationExplorerIcon,
    'Attractor Visualizer': AttractorVisualizerIcon,
    Witness: WitnessIcon,
    'Control Perturbations Table': ControlPerturbationsTableIcon,
  };

  // #endregion

  /** Determines if more than one instance of a tab can be opened. */
  public static canOpenMoreThanOne(tabType: TabType): boolean {
    return !this.singleTabTypes.has(tabType);
  }

  public static getTabTypeIcon(tabType: TabType): string {
    return this.tabTypeToIcon[tabType] ?? '';
  }
}

export default TabOperations;
