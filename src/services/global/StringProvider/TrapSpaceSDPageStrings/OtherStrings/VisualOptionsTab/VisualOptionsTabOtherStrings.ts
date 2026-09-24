import type { VisualOptionsTabOtherStringsInt } from './VisualOptionsTabOtherStringsInt';

class VisualOptionsTabOtherStrings implements VisualOptionsTabOtherStringsInt {
  // #region --- Layout Options ---

  public layoutOptionsHeader() {
    return 'Layout Options';
  }

  public animateLayoutChangesButton() {
    return 'Animate Layout Changes';
  }

  public snapNodesToLayersButton() {
    return 'Snap Nodes To Layers';
  }

  //#endregion
}

export default VisualOptionsTabOtherStrings;
