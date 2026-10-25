import type { VariableStateFilterTableOtherStringsInt } from './VariableStateFilterTableOtherStringsInt';

class VariableStateFilterTableOtherStrings implements VariableStateFilterTableOtherStringsInt {
  public filterTableSectionHeader() {
    return 'Filter By Percolated Variables';
  }

  public emptyFilterTablePlaceholderText() {
    return 'No Variables Available.';
  }

  public filterRowsButton() {
    return 'Filter Rows';
  }

  public variableNameSearchInputPlaceholder() {
    return 'Insert variable names...';
  }

  public changeFilterForVariableButton() {
    return 'TS Value';
  }
}

export default VariableStateFilterTableOtherStrings;
