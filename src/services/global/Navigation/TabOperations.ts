import type { TabType } from '../../../types';

/** Class containing static methods over navigation tabs */
class TabOperations {
  // #region --- Properties ---

  /** A set of tab types that can only be opened as a single instance. */
  private static singleTabTypes: Set<TabType> = new Set<TabType>([
    'Attractor Bifurcation Explorer',
    'Control Perturbations Table',
  ]);

  // #endregion

  /** Determines if more than one instance of a tab can be opened. */
  public static canOpenMoreThanOne(tabType: TabType): boolean {
    return !this.singleTabTypes.has(tabType);
  }
}

export default TabOperations;
