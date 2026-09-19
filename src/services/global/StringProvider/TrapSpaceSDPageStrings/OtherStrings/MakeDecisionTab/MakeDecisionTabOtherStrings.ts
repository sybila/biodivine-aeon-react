import type { MakeDecisionTabOtherStringsInt } from './MakeDecisionTabOtherStringsInt';

class MakeDecisionTabOtherStrings implements MakeDecisionTabOtherStringsInt {
  cannotMakeDecisionOnLeafNode() {
    return 'Cannot make decision on minimal trap space (choose node which is not a leaf node to make further decisions).';
  }

  noSelectedNode() {
    return 'No selected node';
  }
}

export default MakeDecisionTabOtherStrings;
