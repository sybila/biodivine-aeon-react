import type { WarningsOtherStringsInt } from './WarningsOtherStringsInt';

class WarningsOtherStrings implements WarningsOtherStringsInt {
  // #region --- Delete Node With Children ---

  public deleteNodeWithChildrenWarningMessage() {
    return 'Do you want to keep the parent node and delete only its children, or delete the parent node together with its children?';
  }

  public deleteNodeWithChildrenCancelButton() {
    return 'Cancel Deletion';
  }

  public deleteNodeWithChildrenDeleteNodeWithChildrenButton() {
    return 'Delete node and children';
  }

  public deleteNodeWithChildrenDeleteOnlyChildrenButton() {
    return 'Delete only children';
  }

  // #endregion
}

export default WarningsOtherStrings;
