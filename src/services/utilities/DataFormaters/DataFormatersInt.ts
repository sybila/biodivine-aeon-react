import type { ControlResult } from '../../../types';

/**
 * Interface for data formating utility function.
 */
export interface DataFormatersInt {
  /** Converts a robustness value from decimal fraction to a percentage string. */
  convertRobustnessToPercentage(robustness: number): string;

  /** Converts an array of perturbations to a CSV string.
   *  Each perturbation is represented as a row in the CSV, with columns for id, perturbation, size, number of interpretations, and robustness percentage.
   */
  convertPerturbationsToCsvString(perturbations: Array<ControlResult>): string;

  /** Converts a comma-separated string into an array of trimmed strings.
   */
  convertCommaSeparatedStringToArray(text: string): Array<string>;
}
