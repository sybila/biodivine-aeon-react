import type { UtilitiesMenuTooltipsInt } from './UtilitiesMenuTooltipsInt';

class UtilitiesMenuTooltips implements UtilitiesMenuTooltipsInt {
  public utilitiesMenuOpenCloseButton() {
    return 'Show/Hide Utilities Menu';
  }

  public fitButton() {
    return 'Fit the succession diagram to the canvas';
  }

  public resetLayoutButton() {
    return 'Reset the layout of the succession diagram to the default';
  }
}

export default UtilitiesMenuTooltips;
