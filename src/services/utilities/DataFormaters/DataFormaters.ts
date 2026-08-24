import type { ControlResult } from '../../../types/types';
import type { DataFormatersInt } from './DataFormatersInt';

/** Utility class for formating data */
class DataFormaters implements DataFormatersInt {
  public convertRecordOfVariableStatesToString(
    variableStates: Record<string, number | undefined>
  ): string {
    return Object.entries(variableStates)
      .sort(([keyA], [keyB]) => Number(keyA) - Number(keyB))
      .map(([_, value]) => (value === 0 ? '0' : value === 1 ? '1' : '*'))
      .join('');
  }

  public convertRobustnessToPercentage(robustness: number) {
    if (robustness === undefined) {
      return 'unknown';
    }

    return (robustness * 100).toFixed(2);
  }

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
