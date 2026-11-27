import ComputeEngineMenuOtherStrings from './ComputeEngineMenu/ComputeEngineMenuOtherStrings';
import type { ComputeEngineMenuOtherStringsInt } from './ComputeEngineMenu/ComputeEngineMenuOtherStringsInt';
import type { OverlayWindowsInt } from './OverlayWindowsInt';

class OverlayWindows implements OverlayWindowsInt {
  public ComputeEngineMenu: ComputeEngineMenuOtherStringsInt;

  constructor() {
    this.ComputeEngineMenu = new ComputeEngineMenuOtherStrings();
  }
}

export default OverlayWindows;
