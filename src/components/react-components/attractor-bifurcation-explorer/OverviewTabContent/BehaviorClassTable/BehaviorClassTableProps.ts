import type { AttractorBifurcationExplorerInt } from '../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { BehaviorClassOperationsInt } from '../../../../../services/utilities/BehaviorClassOperations/BehaviorClassOperationsInt';
import type { AttractorClassBE } from '../../../../../types/types';

export type BehaviorClassTableProps = {
  maxTableHeight: string;
  minTableHeight: string;
  tableWidth: string;

  classes: AttractorClassBE[];
  nodeCardinality: number;
  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
  behaviorClassOperationsServ: BehaviorClassOperationsInt;
};
