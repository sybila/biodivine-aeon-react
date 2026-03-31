import type { EdgeMonotonicity, Regulation } from '../../../../types';

/**
 * Interface for managing regulations in the LiveModel.
 */
export interface RegulationsLMInt {
  // #region --- Setters for Model Visualization functions ---

  /** Setter for function which removes regulation from ModelVisualization */
  setRemoveFromModelVisualizationFunction(
    func: (regulatorId: number, targetId: number) => void
  ): void;

  /** Setter for function which ensures regulation in ModelVisualization */
  setEnsureInModelVisualizationFunction(
    func: (regulation: Regulation) => void
  ): void;

  // #endregion

  // #region --- Regulation Actions ---

  addRegulation(
    modAllowed: boolean,
    addIntoUndoRedo: boolean,
    regulatorId: number,
    targetId: number,
    isObservable: boolean,
    monotonicity: EdgeMonotonicity
  ): boolean | void;

  removeRegulation(
    addIntoUndoRedo: boolean,
    regulatorId: number,
    targetId: number,
    force?: boolean
  ): boolean;

  regulationChanged(regulation: Regulation): void;

  // #endregion

  // #region --- Observability ---

  setObservability(
    regulatorId: number,
    targetId: number,
    isObservable: boolean,
    addIntoUndoRedo: boolean
  ): void;

  toggleObservability(
    regulatorId: number,
    targetId: number,
    addIntoUndoRedo: boolean,
    force: boolean
  ): void;

  // #endregion

  // #region --- Monotonicity ---

  setMonotonicity(
    regulatorId: number,
    targetId: number,
    monotonicity: EdgeMonotonicity
  ): void;

  toggleMonotonicity(
    regulatorId: number,
    targetId: number,
    force?: boolean
  ): void;

  // #endregion

  // #region --- Regulation formating ---

  regulationToString(regulation: Regulation): string;

  // #endregion
}
