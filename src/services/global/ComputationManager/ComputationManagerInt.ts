import type {
  AttractorResults,
  ComputationModes,
  ComputationStatus,
  ControlResults,
} from '../../../types/types';
import type { LiveModelInt } from '../LiveModel/LiveModelInt';
import type { AttractorAnalysisInt } from './AttractorAnalysis/AttractorAnalysisInt';
import type { ControlInt } from './Control/ControlInt';
import type { ModelInt } from './Model/ModelInt';
import type { TrapSpaceSuccessionDiagramInt } from './TrapSpaceSuccessionDiagram/TrapSpaceSuccessionDiagramInt';

/**
 * Interface for ComputationManagerClass. All public functions are included with their documentation and types.
 * Types are kept as in the class, even if there are syntax errors due to dependencies.
 */
export interface ComputationManagerInt {
  // #region --- Modules ---

  /** Module responsible for running computation of control and setting of parameters needed for this computation. */
  Control: ControlInt;

  /** Module responsible for performing attractor analysis computation and visualization of its results */
  AttractorAnalysis: AttractorAnalysisInt;

  /** Module responsible for managing trap space succession diagram (eg. addition of nodes, deletion of nodes ...) */
  TrapSpaceSuccessionDiagram: TrapSpaceSuccessionDiagramInt;

  /** Module responsible for performing operations over models (eg. validation of models update functions) */
  Model: ModelInt;

  // #endregion

  // #region --- LiveModel Reference ---

  /** Setter for the LiveModel reference */
  setLiveModel(liveModel: LiveModelInt): void;

  // #endregion

  // #region --- External Compute Engine Adress Setters/Getters ---

  /** Sets the URL of the compute engine */
  setComputeEngineAddress(address: string): void;

  /** Returns the URL of the compute engine */
  getComputeEngineAddress(): string | undefined;

  // #endregion

  // #region --- Connection Manager ---

  isComputeEngineConnected(): boolean;

  toggleConnection(): void;

  computationIsRunning(): boolean;

  // #endregion

  // #region --- Computation Status ---

  setComputationStatus(
    warning: string | undefined,
    error: string | undefined,
    computeEngineStatus?: string | undefined,
    computationStatus?: ComputationStatus | undefined,
    color?: string | undefined
  ): void;

  // #endregion

  // #region --- Results ---

  setResults(
    warning: string | undefined,
    error: string | undefined,
    type: ComputationModes | undefined,
    results: AttractorResults | ControlResults | undefined
  ): void;

  // #endregion
}
