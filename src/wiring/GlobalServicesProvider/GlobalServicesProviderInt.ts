import type { ComputationManagerInt } from '../../services/global/ComputationManager/ComputationManagerInt';
import type { LiveModelInt } from '../../services/global/LiveModel/LiveModelInt';
import type { LoadingInt } from '../../services/global/Loading/LoadingInt';
import type { MessageInt } from '../../services/global/Message/MessageInt';
import type { TabOperationsInt } from '../../services/global/Navigation/TabOperationsInt';
import type { OpenCloseOperationsInt } from '../../services/global/OpenCloseOperations/OpenCloseOperationsInt';
import type { ResultsOperationsInt } from '../../services/global/ResultsOperations/ResultsOperationsInt';
import type { StringProviderInt } from '../../services/global/StringProvider/StringProviderInt';
import type { WarningInt } from '../../services/global/Warning/WarningInt';

/** Interfaces which defines the provider of global services. */
export interface GlobalServicesProviderInt {
  computationManagerServ: ComputationManagerInt;
  liveModelServ: LiveModelInt;
  tabOperationsServ: TabOperationsInt;
  resultsOperationsServ: ResultsOperationsInt;
  openCloseOperationsServ: OpenCloseOperationsInt;
  warningServ: WarningInt;
  messageServ: MessageInt;
  loadingServ: LoadingInt;
  stringProviderServ: StringProviderInt;
}
