import type {
  AttractorResults,
  ComputationModes,
  ControlResults,
} from '../../../types';

export type ResultsStatus = {
  /** Type of currently active results */
  type: ComputationModes | undefined;
  /** Currently active results */
  results: AttractorResults | ControlResults | undefined;
  setType(type: ComputationModes | undefined): void;
  setResults: (results: AttractorResults | ControlResults | undefined) => void;
  clear: () => void;
};
