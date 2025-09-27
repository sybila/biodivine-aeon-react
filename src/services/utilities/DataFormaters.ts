import type { ControlResult } from '../../types';

/** Utility class for formating data */
class DataFormaters {
  /** Converts a robustness value from decimal fraction to a percentage string. */
  public static convertRobustnessToPercentage(robustness: number): string {
    if (robustness === undefined) {
      return 'unknown';
    }

    return (robustness * 100).toFixed(2);
  }

  /** Converts an array of perturbations to a CSV string.
   *  Each perturbation is represented as a row in the CSV, with columns for id, perturbation, size, number of interpretations, and robustness percentage.
   */
  public static convertPerturbationsToCsvString(
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
      },${
        perturbation.color_count
      },${DataFormaters.convertRobustnessToPercentage(
        perturbation.robustness
      )}\n`;
    });
    const header =
      'id,perturbation,size,NumberOfInterpretations,robustness(%)\n';
    const csvString = header + perturbationsAsArray.join('');
    return csvString;
  }
}

export default DataFormaters;
