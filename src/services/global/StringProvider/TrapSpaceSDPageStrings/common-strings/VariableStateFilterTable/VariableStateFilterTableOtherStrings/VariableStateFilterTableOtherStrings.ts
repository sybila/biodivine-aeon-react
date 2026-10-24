import type { VariableStateFilterTableOtherStringsInt } from './VariableStateFilterTableOtherStringsInt';

class VariableStateFilterTableOtherStrings implements VariableStateFilterTableOtherStringsInt {
  public filterTableSectionHeader() {
    return 'Filter By Percolated Variables';
  }

  public emptyFilterTablePlaceholderText() {
    return 'No Variables Available.';
  }

  public filterTrapSpacesButton() {
    return 'Filter Trap Spaces';
  }
}

export default VariableStateFilterTableOtherStrings;
