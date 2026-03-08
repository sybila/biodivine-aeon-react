import ComputationManager from '../../services/global/ComputationManager/ComputationManager';
import type { ComputationManagerInt } from '../../services/global/ComputationManager/ComputationManagerInt';
import type { StoresProviderInt } from '../StoresProvider/StoresProviderInt';

class GlobalServicesProvider {
  public computationManagerServ: ComputationManagerInt;
  //   public liveModelServ: LiveModelInt;
  //   public tabOperationsServ: TabOperationsInt;
  //   public resultsOperationsServ: ResultsOperationsInt;
  //   public warningServ: WarningInt;

  constructor(storesProvider: StoresProviderInt) {
    this.computationManagerServ = new ComputationManager(
      storesProvider.bifurcationExplorerStatusStore,
      storesProvider.resultsStatusStore,
      storesProvider.computeEngineStatusStore,
      storesProvider.updateFunctionsStore,
      storesProvider.variablesStore,
      storesProvider.tabsStore
    );
  }
}
