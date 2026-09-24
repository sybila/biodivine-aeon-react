import type { VisualOptionsTabTooltipsInt } from './VisualOptionsTabTooltipsInt';

class VisualOptionsTabTooltips implements VisualOptionsTabTooltipsInt {
  // #region --- Layout Options ---

  animateLayoutChangesButton() {
    return 'Toggle animation of layout changes';
  }

  snapNodesToLayersButton() {
    return 'Toggle snapping of nodes to layers';
  }

  // #endregion
}

export default VisualOptionsTabTooltips;
