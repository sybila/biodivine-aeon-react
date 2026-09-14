import AttractorAnalysisResults from './AttractorAnalysisResults/AttractorAnalysisResults';
import type { AttractorAnalysisResultsInt } from './AttractorAnalysisResults/AttractorAnalysisResultsInt';
import ControlResults from './ControlResults/ControlResults';
import type { ControlResultsInt } from './ControlResults/ControlResultsInt';
import type { ResultsTooltipsInt } from './ResultsTooltipsInt';

class ResultsTooltips implements ResultsTooltipsInt {
  AttractorAnalysisResults: AttractorAnalysisResultsInt;
  ControlResults: ControlResultsInt;

  constructor() {
    this.AttractorAnalysisResults = new AttractorAnalysisResults();
    this.ControlResults = new ControlResults();
  }
}

export default ResultsTooltips;
