import type { ControlResult } from '../../../types';
import type { DataFormatersInt } from './DataFormatersInt';

/** Utility class for formating data */
class DataFormaters implements DataFormatersInt {
  /** Converts a record of variable states to a string
   *  The record maps variable ids to their states (0, 1, or * for free/unpercolated).
   * @param variableStates - (Record<string, number | undefined>) An object mapping variable names to their states (0, 1, or undefined for free/unpercolated).
   */
  public convertRecordOfVariableStatesToString(
    variableStates: Record<string, number | undefined>
  ): string {
    return Object.entries(variableStates)
      .sort(([keyA], [keyB]) => Number(keyA) - Number(keyB))
      .map(([_, value]) => (value === 0 ? '0' : value === 1 ? '1' : '*'))
      .join('');
  }

  /** Converts a robustness value from decimal fraction to a percentage string. */
  public convertRobustnessToPercentage(robustness: number): string {
    if (robustness === undefined) {
      return 'unknown';
    }

    return (robustness * 100).toFixed(2);
  }

  /** Converts an array of perturbations to a CSV string.
   *  Each perturbation is represented as a row in the CSV, with columns for id, perturbation, size, number of interpretations, and robustness percentage.
   */
  public convertPerturbationsToCsvString(
    perturbations: Array<ControlResult>
  ): string {
    const perturbationsAsArray = perturbations.map((perturbation) => {
      const perturbationEntries = Object.entries(perturbation.perturbation);
      const perturbationAsString =
        !perturbationEntries || perturbationEntries.length === 0
          ? 'Empty Perturbation'
          : perturbationEntries
              .map(([key, value]) => `${key}:${value}`)
              .join(' ');
      return `${perturbation.id},${perturbationAsString},${
        perturbationEntries.length
      },${perturbation.color_count},${this.convertRobustnessToPercentage(
        perturbation.robustness
      )}\n`;
    });
    const header =
      'id,perturbation,size,NumberOfInterpretations,robustness(%)\n';
    const csvString = header + perturbationsAsArray.join('');
    return csvString;
  }

  /** Converts a comma-separated string into an array of trimmed strings.
   */
  public convertCommaSeparatedStringToArray(
    text: string,
    toLowerCase: boolean = false
  ): Array<string> {
    return text.split(',').map((item) => {
      const trimmedItem = item.trim();
      return toLowerCase ? trimmedItem.toLowerCase() : trimmedItem;
    });
  }
}

export default DataFormaters;
