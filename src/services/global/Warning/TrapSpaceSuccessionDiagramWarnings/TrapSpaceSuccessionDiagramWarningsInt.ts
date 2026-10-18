import type { NodeDataTSSD } from '../../../../types/types';

/** Module of Warnings class for managing warnings over the TrapSpaceSuccessionDiagram page. */
export interface TrapSpaceSuccessionDiagramWarningsInt {
  selectTrapSpacesWarning(
    makeDecisionFunction: (selectedTrapSpacesIds: Array<number>) => void,
    availableTrapSpaces: Array<NodeDataTSSD>
  ): void;
}
