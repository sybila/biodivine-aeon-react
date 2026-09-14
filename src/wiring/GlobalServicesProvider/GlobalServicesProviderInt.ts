import type { ComputationManagerInt } from '../../services/global/ComputationManager/ComputationManagerInt';
import type { LiveModelInt } from '../../services/global/LiveModel/LiveModelInt';
import type { LoadingInt } from '../../services/global/Loading/LoadingInt';
import type { MessageInt } from '../../services/global/Message/MessageInt';
import type { TabOperationsInt } from '../../services/global/Navigation/TabOperationsInt';
import type { OpenCloseOperationsInt } from '../../services/global/OpenCloseOperations/OpenCloseOperationsInt';
import type { ResultsOperationsInt } from '../../services/global/ResultsOperations/ResultsOperationsInt';
import type { ShortcutManagerInt } from '../../services/global/ShortcutManager/ShortcutManagerInt';
import type { StringProviderInt } from '../../services/global/StringProvider/StringProviderInt';
import type { WarningInt } from '../../services/global/Warning/WarningInt';
import type { ModelEditorInt } from '../../services/model-editor/ModelEditor/ModelEditorInt';
import type { ModelEditorStatus } from '../../stores/ModelEditor/ModelEditorStatus';
import type { UndoRedoState } from '../../stores/UndoRedo/UndoRedoState';
import type { ZustandStore } from '../../stores/ZustandStoreType';

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
  shortcutManagerServ?: ShortcutManagerInt;
  stringProviderServ: StringProviderInt;

  initializeShortcutManager: (
    modelEditorServ: ModelEditorInt,

    modelEditorStatusStore: ZustandStore<ModelEditorStatus>,
    modelUndoRedoStore: ZustandStore<UndoRedoState>
  ) => void;
}
