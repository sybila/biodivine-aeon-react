import type { ControlResultsInt } from './ControlResultsInt';

class ControlResults implements ControlResultsInt {
  openTableVisualization(): string {
    return 'Show computed perturbations as table.';
  }
  exportAsCsv(): string {
    return 'Export computed perturbations in the form of csv file.';
  }
}

export default ControlResults;
