import type { AttractorBifurcationExplorerInt } from '../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { DecisionMixedNode, LeafNode } from '../../../../../types';

export type NodeStatTableProps = {
  nodeData: LeafNode | DecisionMixedNode;
  attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;
};
