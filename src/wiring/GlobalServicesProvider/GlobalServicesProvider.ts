import ComputationManager from '../../services/global/ComputationManager/ComputationManager';
import type { ComputationManagerInt } from '../../services/global/ComputationManager/ComputationManagerInt';
import LiveModel from '../../services/global/LiveModel/LiveModel';
import type { LiveModelInt } from '../../services/global/LiveModel/LiveModelInt';
import TabOperations from '../../services/global/Navigation/TabOperations';
import type { TabOperationsInt } from '../../services/global/Navigation/TabOperationsInt';
import ResultsOperations from '../../services/global/ResultsOperations/ResultsOperations';
import type { ResultsOperationsInt } from '../../services/global/ResultsOperations/ResultsOperationsInt';
import Warning from '../../services/global/Warning/Warning';
import type { WarningInt } from '../../services/global/Warning/WarningInt';
import type { StoresProviderInt } from '../StoresProvider/StoresProviderInt';
import type { UtilitiesServiceProviderInt } from '../UtilitiesServiceProvider/UtilitiesServiceProviderInt';

class GlobalServicesProvider {
  public computationManagerServ: ComputationManagerInt;
  public liveModelServ: LiveModelInt;
  public tabOperationsServ: TabOperationsInt;
  public resultsOperationsServ: ResultsOperationsInt;
  public warningServ: WarningInt;

  constructor(
    utilitiesServiceProvider: UtilitiesServiceProviderInt,
    storesProvider: StoresProviderInt
  ) {
    this.computationManagerServ = new ComputationManager(
      storesProvider.bifurcationExplorerStatusStore,
      storesProvider.resultsStatusStore,
      storesProvider.computeEngineStatusStore,
      storesProvider.updateFunctionsStore,
      storesProvider.variablesStore,
      storesProvider.tabsStore
    );
    this.warningServ = new Warning(
      storesProvider.resultsStatusStore,
      storesProvider.tabsStore,
      storesProvider.warningStore,
      utilitiesServiceProvider.waiterFunctionServ
    );

    this.tabOperationsServ = new TabOperations();
    this.resultsOperationsServ = new ResultsOperations(
      utilitiesServiceProvider.dataFormatersServ,
      utilitiesServiceProvider.fileHelpersServ
    );

    this.liveModelServ = new LiveModel(
      this.computationManagerServ,
      this.warningServ,
      utilitiesServiceProvider.fileHelpersServ,
      storesProvider.loadedModelStore,
      storesProvider.tabsStore,
      storesProvider.resultsStatusStore,
      storesProvider.modelEditorStatusStore,
      storesProvider.variablesStore,
      storesProvider.regulationsStore,
      storesProvider.updateFunctionsStore,
      storesProvider.controlStore,
      storesProvider.modelInfoStore
    );
  }
}

export default GlobalServicesProvider;
