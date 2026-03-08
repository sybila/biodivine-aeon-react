import ComputationManager from '../../services/global/ComputationManager/ComputationManager';
import type { ComputationManagerInt } from '../../services/global/ComputationManager/ComputationManagerInt';
import LiveModel from '../../services/global/LiveModel/LiveModel';
import type { LiveModelInt } from '../../services/global/LiveModel/LiveModelInt';
import type { WarningInt } from '../../services/global/Warning/WarningInt';
import type { FileHelpersInt } from '../../services/utilities/FileHelpers/FileHelpersInt';
import type { StoresProviderInt } from '../StoresProvider/StoresProviderInt';

class GlobalServicesProvider {
  public computationManagerServ: ComputationManagerInt;
  public liveModelServ: LiveModelInt;
  //   public tabOperationsServ: TabOperationsInt;
  //   public resultsOperationsServ: ResultsOperationsInt;
  //   public warningServ: WarningInt;

  constructor(
    computationManagerServ: ComputationManagerInt,
    warningServ: WarningInt,
    fileHelpersServ: FileHelpersInt,
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
    this.liveModelServ = new LiveModel(
      computationManagerServ,
      warningServ,
      fileHelpersServ,
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
