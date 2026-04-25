import ComputationManager from '../../services/global/ComputationManager/ComputationManager';
import type { ComputationManagerInt } from '../../services/global/ComputationManager/ComputationManagerInt';
import LiveModel from '../../services/global/LiveModel/LiveModel';
import type { LiveModelInt } from '../../services/global/LiveModel/LiveModelInt';
import Loading from '../../services/global/Loading/Loading';
import type { LoadingInt } from '../../services/global/Loading/LoadingInt';
import Message from '../../services/global/Message/Message';
import type { MessageInt } from '../../services/global/Message/MessageInt';
import TabOperations from '../../services/global/Navigation/TabOperations';
import type { TabOperationsInt } from '../../services/global/Navigation/TabOperationsInt';
import OpenCloseOperations from '../../services/global/OpenCloseOperations/OpenCloseOperations';
import type { OpenCloseOperationsInt } from '../../services/global/OpenCloseOperations/OpenCloseOperationsInt';
import ResultsOperations from '../../services/global/ResultsOperations/ResultsOperations';
import type { ResultsOperationsInt } from '../../services/global/ResultsOperations/ResultsOperationsInt';
import StringProvider from '../../services/global/StringProvider/StringProvider';
import type { StringProviderInt } from '../../services/global/StringProvider/StringProviderInt';
import Warning from '../../services/global/Warning/Warning';
import type { WarningInt } from '../../services/global/Warning/WarningInt';
import type { StoresProviderInt } from '../StoresProvider/StoresProviderInt';
import type { UtilitiesServiceProviderInt } from '../UtilitiesServiceProvider/UtilitiesServiceProviderInt';
import type { GlobalServicesProviderInt } from './GlobalServicesProviderInt';

class GlobalServicesProvider implements GlobalServicesProviderInt {
  public computationManagerServ: ComputationManagerInt;
  public liveModelServ: LiveModelInt;
  public tabOperationsServ: TabOperationsInt;
  public resultsOperationsServ: ResultsOperationsInt;
  public openCloseOperationsServ: OpenCloseOperationsInt;
  public warningServ: WarningInt;
  public messageServ: MessageInt;
  public loadingServ: LoadingInt;
  public stringProviderServ: StringProviderInt;

  constructor(
    utilitiesServiceProvider: UtilitiesServiceProviderInt,
    storesProvider: StoresProviderInt,
    successMessageFunction: (message: string, duration?: number) => void,
    infoMessageFunction: (message: string, duration?: number) => void,
    errorMessageFunction: (message: string, duration?: number) => void,
    startLoadingFunction: () => void,
    endLoadingFunction: () => void
  ) {
    this.openCloseOperationsServ = new OpenCloseOperations();

    this.stringProviderServ = new StringProvider();

    this.messageServ = new Message(
      successMessageFunction,
      infoMessageFunction,
      errorMessageFunction
    );
    this.loadingServ = new Loading(
      startLoadingFunction,
      endLoadingFunction,
      storesProvider.tabsStore
    );

    this.tabOperationsServ = new TabOperations(storesProvider.tabsStore);
    this.resultsOperationsServ = new ResultsOperations(
      utilitiesServiceProvider.dataFormatersServ,
      utilitiesServiceProvider.fileHelpersServ
    );

    this.warningServ = new Warning(
      this.tabOperationsServ,
      storesProvider.resultsStatusStore,
      storesProvider.tabsStore,
      storesProvider.warningStore,
      utilitiesServiceProvider.waiterFunctionServ
    );

    this.computationManagerServ = new ComputationManager(
      this.tabOperationsServ,
      this.messageServ,
      this.loadingServ,
      storesProvider.bifurcationExplorerStatusStore,
      storesProvider.resultsStatusStore,
      storesProvider.computeEngineStatusStore,
      storesProvider.updateFunctionsStore,
      storesProvider.variablesStore,
      storesProvider.tabsStore
    );

    this.liveModelServ = new LiveModel(
      this.computationManagerServ,
      this.warningServ,
      utilitiesServiceProvider.fileHelpersServ,
      this.tabOperationsServ,
      this.messageServ,
      this.loadingServ,
      storesProvider.loadedModelStore,
      storesProvider.tabsStore,
      storesProvider.resultsStatusStore,
      storesProvider.modelEditorStatusStore,
      storesProvider.variablesStore,
      storesProvider.regulationsStore,
      storesProvider.updateFunctionsStore,
      storesProvider.controlStore,
      storesProvider.modelInfoStore,
      storesProvider.modelUndoRedoStore,
      storesProvider.variablePositionsStore
    );
  }
}

export default GlobalServicesProvider;
