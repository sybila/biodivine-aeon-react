import type { SelectTrapSpacesOverlayWindowOtherStringsInt } from './SelectTrapSpacesOverlayWindowOtherStringsInt';

class SelectTrapSpacesOverlayWindowOtherStrings implements SelectTrapSpacesOverlayWindowOtherStringsInt {
  // #region --- Filter Table Section ---

  public filterTableSectionHeader() {
    return 'Filter By Percolated Variables';
  }

  public emptyFilterTablePlaceholderText() {
    return 'No Variables Available.';
  }

  public filterTrapSpacesButton() {
    return 'Filter Trap Spaces';
  }

  // #endregion

  // #region --- Trap Space Section ---

  public trapSpaceSectionHeader() {
    return 'Available Trap Spaces';
  }

  public emptyTrapSpaceTablePlaceholderText() {
    return 'No available trap spaces match current filter.';
  }

  public selectTrapSpaceButton() {
    return 'Select';
  }

  // #endregion
}

export default SelectTrapSpacesOverlayWindowOtherStrings;
