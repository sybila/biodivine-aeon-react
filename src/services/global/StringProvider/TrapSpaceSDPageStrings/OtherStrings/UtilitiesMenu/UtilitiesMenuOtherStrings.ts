import type { UtilitiesMenuOtherStringsInt } from './UtilitiesMenuOtherStringsInt';

class UtilitiesMenuOtherStrings implements UtilitiesMenuOtherStringsInt {
  public fitIntoViewHeader() {
    return 'Fit Into View';
  }
  public fitIntoViewButton() {
    return 'Fit';
  }

  public resetLayoutHeader() {
    return 'Reset Layout';
  }
  public resetLayoutButton() {
    return 'Reset';
  }
}

export default UtilitiesMenuOtherStrings;
