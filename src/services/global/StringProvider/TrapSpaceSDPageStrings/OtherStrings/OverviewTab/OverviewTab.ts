import type { OverviewTabInt } from './OverviewTabInt';

class OverviewTab implements OverviewTabInt {
  // #region --- Global ---

  public noSelectedItem() {
    return 'No selected item. Please select node or edge to see overview.';
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

export default OverviewTab;
