import TrapSpaceSuccessionDiagram from '../../services/trap-space-succession-diagram/TrapSpaceSuccessionDiagram/TrapSpaceSuccessionDiagram';
import type { TrapSpaceSuccessionDiagramInt } from '../../services/trap-space-succession-diagram/TrapSpaceSuccessionDiagram/TrapSpaceSuccessionDiagramInt';
import type { DataFormatersInt } from '../../services/utilities/DataFormaters/DataFormatersInt';
import type { GlobalServicesProviderInt } from '../GlobalServicesProvider/GlobalServicesProviderInt';
import type { StoresProviderInt } from '../StoresProvider/StoresProviderInt';
import type { TrapSpaceSuccessionDiagramServicesProviderInt } from './TrapSpaceSuccessionDiagramServicesProviderInt';

class TrapSpaceSuccessionDiagramServicesProvider implements TrapSpaceSuccessionDiagramServicesProviderInt {
  public trapSpaceSDServ: TrapSpaceSuccessionDiagramInt;

  constructor(
    storesProvider: StoresProviderInt,
    globalServicesProvider: GlobalServicesProviderInt,
    dataFormatersServ: DataFormatersInt
  ) {
    this.trapSpaceSDServ = new TrapSpaceSuccessionDiagram(
      globalServicesProvider.messageServ,
      dataFormatersServ,
      globalServicesProvider.computationManagerServ,
      storesProvider.trapSpaceSDStatusStore
    );
  }
}

export default TrapSpaceSuccessionDiagramServicesProvider;
