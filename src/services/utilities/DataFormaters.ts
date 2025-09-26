/** Utility class for formating data */
class DataFormaters {
  /** Converts a robustness value from decimal fraction to a percentage string. */
  public static convertRobustnessToPercentage(robustness: number): string {
    if (robustness === undefined) {
      return 'unknown';
    }

    return (robustness * 100).toFixed(2);
  }
}

export default DataFormaters;
