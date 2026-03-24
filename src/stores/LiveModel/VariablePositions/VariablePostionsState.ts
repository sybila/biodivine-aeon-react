import type { Position } from '../../../types';

/** State for managing positions variable nodes in the ModelVisualization */
export type VariablePositionsState = {
  /** Record containing positions of variable nodes */
  variablePositions: Record<number, Position>;
  /** Function to set the position of a variable node */
  setVariablePosition: (variableId: number, position: Position) => void;
  /** Remove the position of a variable node */
  removeVariablePosition: (variableId: number) => void;
  /** Function to clear all variable positions */
  clear: () => void;
};
