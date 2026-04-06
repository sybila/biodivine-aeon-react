import type { ComputationManagerInt } from '../../services/global/ComputationManager/ComputationManagerInt';
import type { MessageInt } from '../../services/global/Message/MessageInt';
import TrapSpaceSuccessionDiagram from '../../services/trap-space-succession-diagram/TrapSpaceSuccessionDiagram/TrapSpaceSuccessionDiagram';
import type { TrapSpaceSuccessionDiagramInt } from '../../services/trap-space-succession-diagram/TrapSpaceSuccessionDiagram/TrapSpaceSuccessionDiagramInt';
import type { StoresProviderInt } from '../StoresProvider/StoresProviderInt';
import type { TrapSpaceSuccessionDiagramServicesProviderInt } from './TrapSpaceSuccessionDiagramServicesProviderInt';

class TrapSpaceSuccessionDiagramServicesProvider implements TrapSpaceSuccessionDiagramServicesProviderInt {
  public trapSpaceSDServ: TrapSpaceSuccessionDiagramInt;

  constructor(
    storesProvider: StoresProviderInt,
    computationManagerServ: ComputationManagerInt,
    messageServ: MessageInt
  ) {
    this.trapSpaceSDServ = new TrapSpaceSuccessionDiagram(
      messageServ,
      computationManagerServ,
      storesProvider.trapSpaceSDStatusStore
    );
  }
}

export default TrapSpaceSuccessionDiagramServicesProvider;
