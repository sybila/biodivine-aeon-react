import type { ControlResult } from '../../../types';

/**
 * Interface for data formating utility function.
 */
export interface DataFormatersInt {
  /** Converts a record of variable states to a string
   *  The record maps variable ids to their states (0, 1, or * for free/unpercolated).
   * @param variableStates - (Record<string, number | undefined>) An object mapping variable names to their states (0, 1, or undefined for free/unpercolated).
   */
  convertRecordOfVariableStatesToString(
    variableStates: Record<string, number | undefined>
  ): string;

  /** Converts a robustness value from decimal fraction to a percentage string. */
  convertRobustnessToPercentage(robustness: number): string;

  /** Converts an array of perturbations to a CSV string.
   *  Each perturbation is represented as a row in the CSV, with columns for id, perturbation, size, number of interpretations, and robustness percentage.
   */
  convertPerturbationsToCsvString(perturbations: Array<ControlResult>): string;

  /** Converts a comma-separated string into an array of trimmed strings.
   */
  convertCommaSeparatedStringToArray(
    text: string,
    toLowerCase?: boolean
  ): Array<string>;
}
