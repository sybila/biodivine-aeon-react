import type { OverviewTabOtherStringsInt } from './OverviewTabOtherStringsInt';

class OverviewTabOtherStrings implements OverviewTabOtherStringsInt {
  // #region --- Global ---

  public noSelectedItem() {
    return 'Select a node or edge to view its overview.';
  }

  public statisticsHeader() {
    return 'Stats';
  }

  public numberOfInterpretationsStatName() {
    return 'Number Of Interpretations';
  }

  public numberOfFixedVarsStatName() {
    return 'Number Of Fixed';
  }

  public numberOfFreeVarsStatName() {
    return 'Number Of Free';
  }

  // #endregion

  // #region --- Edge ----

  public edgeStateVariablesHeader() {
    return 'Stable Motif (Edge) State';
  }

  public numberOfMinTrapSpacesStatName() {
    return 'Number Of Min Trap Spaces';
  }

  // #endregion

  // #region --- Node ---

  public nodeStateVariablesHeader() {
    return 'Trap Space (Node) State';
  }

  public numberOfChildrenStatName() {
    return 'Number Of Children';
  }

  // #endregion
}

export default OverviewTabOtherStrings;
