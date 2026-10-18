import type { MakeDecisionTabOtherStringsInt } from './MakeDecisionTabOtherStringsInt';

class MakeDecisionTabOtherStrings implements MakeDecisionTabOtherStringsInt {
  cannotMakeDecisionOnLeafNode() {
    return 'Cannot make decision on minimal trap space (choose node which is not a leaf node to make further decisions).';
  }

  noSelectedNode() {
    return 'No selected node';
  }

  getTrapSpacesButton() {
    return 'Get Trap Spaces';
  }

  getStableMotifsButton() {
    return 'Get Stable Motifs';
  }

  noAvailableStableMotifs() {
    return 'There are no other stable motifs available for this trap space.';
  }

  selectDecisionButton() {
    return 'Select stable motif';
  }

  fullStableMotifStateHeader() {
    return 'Full State';
  }
}

export default MakeDecisionTabOtherStrings;
