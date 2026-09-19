import type { MakeDecisionTabInt } from './MakeDecisionTabInt';

class MakeDecisionTab implements MakeDecisionTabInt {
  cannotMakeDecisionOnLeafNode(): string {
    return 'Cannot make decision on minimal trap space (choose node which is not a leaf node to make further decisions).';
  }
}

export default MakeDecisionTab;
