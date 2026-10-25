import VariableStateFilterTableOtherStrings from '../../common-strings/VariableStateFilterTable/VariableStateFilterTableOtherStrings/VariableStateFilterTableOtherStrings';
import type { MakeDecisionTabOtherStringsInt } from './MakeDecisionTabOtherStringsInt';

class MakeDecisionTabOtherStrings
  extends VariableStateFilterTableOtherStrings
  implements MakeDecisionTabOtherStringsInt
{
  /* #region --- Common --- */

  public cannotMakeDecisionOnLeafNode() {
    return 'Cannot make decision on minimal trap space (choose node which is not a leaf node to make further decisions).';
  }

  public noSelectedNode() {
    return 'No selected node';
  }

  public filtersHeader() {
    return 'Filter';
  }

  public fullStateHeader() {
    return 'Full State';
  }

  public getDecisionsButton() {
    return 'Get Decisions';
  }

  public numberOfIntepretationsStatName() {
    return 'Number Of Interpretations';
  }

  /* #endregion */

  /* #region  --- Stable Motifs Table ---  */

  public stableMotifsTableHeader() {
    return 'Available Stable Motifs';
  }

  public noAvailableStableMotifs() {
    return 'There are no other stable motifs available for this trap space.';
  }

  public selectStableMotifButton() {
    return 'Select Stable Motif';
  }

  public numberOfMinTrapSpaceStatName() {
    return 'Number of Min. Trap Spaces';
  }

  /* #endregion */

  /* #region --- Trap Space Table --- */

  public trapSpacesTableHeader() {
    return 'Available Trap Spaces';
  }

  public noAvailableTrapSpaces() {
    return 'There are no other trap spaces available for this stable motif.';
  }

  public selectTrapSpaceButton() {
    return 'Select Trap Space';
  }

  /* #endregion */
}

export default MakeDecisionTabOtherStrings;
