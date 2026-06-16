import type { TooltipsInt } from './TooltipsInt';

class Tooltips implements TooltipsInt {
  // #region Visual Options

  fit(): string {
    return 'Fit the bifurcation tree to the canvas';
  }

  resetLayout(): string {
    return 'Reset the layout of the bifurcation tree to the default';
  }

  animateLayoutChanges(): string {
    return 'Toggle animation of layout changes';
  }

  snapNodesToLayers(): string {
    return 'Toggle snapping of nodes to layers';
  }

  positiveOnLeft(): string {
    return 'Toggle whether positive nodes are on the left or right';
  }

  changePrecision(): string {
    return 'Change the precision of the bifuration tree.';
  }

  // #endregion
}

export default Tooltips;
