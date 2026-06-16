import type { AttractorAnalysisResultsInt } from './AttractorAnalysisResultsInt';

class AttractorAnalysisResults implements AttractorAnalysisResultsInt {
  openWitness(): string {
    return 'Open witness model (example fully specified model for this class).';
  }
  openAttractorVisualization(): string {
    return 'Open attractor visualization for this class.';
  }
  openExploreBifurcationFunction(): string {
    return 'Open bifurcation tree exploration of possible model states.';
  }
}

export default AttractorAnalysisResults;
