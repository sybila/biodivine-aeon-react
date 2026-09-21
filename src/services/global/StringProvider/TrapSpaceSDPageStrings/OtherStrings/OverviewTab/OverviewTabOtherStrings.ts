import type { OverviewTabOtherStringsInt as OverviewTabOtherStringsInt } from './OverviewTabOtherStringsInt';

class OverviewTabOtherStrings implements OverviewTabOtherStringsInt {
  // #region --- Global ---

  public noSelectedItem() {
    return 'Select a node or edge to view its overview.';
  }

  numberOfInterpretationsStatName() {
    return 'Number Of Interpretations';
  }

  numberOfFixedVarsStatName() {
    return 'Number Of Fixed';
  }

  numberOfFreeVarsStatName() {
    return 'Number Of Free';
  }

  // #endregion

  // #region --- Edge ----

  edgeStateVariablesHeader() {
    return 'Stable Motif (Edge) State';
  }

  numberOfMinTrapSpacesStatName() {
    return 'Number Of Min Trap Spaces';
  }

  // #endregion

  // #region --- Node ---

  nodeStateVariablesHeader() {
    return 'Trap Space (Node) State';
  }

  numberOfChildrenStatName() {
    return 'Number Of Children';
  }

  // #endregion
}

export default OverviewTabOtherStrings;
