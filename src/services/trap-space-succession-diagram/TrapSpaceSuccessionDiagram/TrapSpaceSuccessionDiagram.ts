import type { TrapSpaceSDStatusState } from '../../../stores/TrapSpaceSuccessionDiagram/TrapSpaceSDStatusState';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import type { NodeDataTSSD } from '../../../types';
import type { MessageInt } from '../../global/Message/MessageInt';
import CytoscapeTSSD from '../TrapSpaceSDVisualization/CytoscapeTSSD';
import type { TrapSpaceSuccessionDiagramInt } from './TrapSpaceSuccessionDiagramInt';

class TrapSpaceSuccessionDiagram implements TrapSpaceSuccessionDiagramInt {
  private visualization: CytoscapeTSSD;

  constructor(
    messageServ: MessageInt,
    trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>
  ) {
    this.visualization = new CytoscapeTSSD(messageServ, trapSpaceSDStatusStore);
  }

  public init(container: HTMLDivElement): void {
    this.visualization.init(container);
  }

  public insertSuccessionDiagram(
    nodeList: NodeDataTSSD[],
    fit: boolean = true,
    animate: boolean = true,
    clearCytoscape: boolean = true
  ): void {
    if (nodeList !== undefined && nodeList.length > 0) {
      if (clearCytoscape) this.visualization.removeAll();
      for (const n of nodeList) {
        this.visualization.ensureNode(n);
      }
      for (const n of nodeList) {
        for (const childId of n.childNodeIds) {
          this.visualization.ensureEdge(n.id, childId);
        }
      }
      // Do not auto-fit when restoring a previously saved pan/zoom state.
      this.visualization.applyTreeLayout(fit, animate);
    }
  }
}

export default TrapSpaceSuccessionDiagram;
