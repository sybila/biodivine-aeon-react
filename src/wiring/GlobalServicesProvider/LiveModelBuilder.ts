import type { ComputationManagerInt } from '../../services/global/ComputationManager/ComputationManagerInt';
import type { WarningInt } from '../../services/global/Warning/WarningInt';
import type { FileHelpersInt } from '../../services/utilities/FileHelpers/FileHelpersInt';
import type { ResultsStatus } from '../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { ControlStatus } from '../../stores/LiveModel/ControlStore/ControlStatus';
import type { ModelState } from '../../stores/LiveModel/LoadedModelStore/ModelState';
import type { ModelInfoState } from '../../stores/LiveModel/ModelInfoStore/ModelInfoState';
import type { RegulationsStatus } from '../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { UpdateFunctionsState } from '../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../stores/ModelEditor/ModelEditorStatus';
import type { TabsState } from '../../stores/Navigation/TabState';
import type { ZustandStore } from '../../stores/ZustandStoreType';

function LiveModelBuilder(
  computationManagerServ: ComputationManagerInt,
  warningServ: WarningInt,
  fileHelpersServ: FileHelpersInt,
  loadedModelStore: ZustandStore<ModelState>,
  tabStore: ZustandStore<TabsState>,
  resultsStatusStore: ZustandStore<ResultsStatus>,
  modelEditorStatusStore: ZustandStore<ModelEditorStatus>,
  variablesStore: ZustandStore<VariablesStatus>,
  regulationsStore: ZustandStore<RegulationsStatus>,
  updateFunctionsStore: ZustandStore<UpdateFunctionsState>,
  controlStore: ZustandStore<ControlStatus>,
  modelInfoStore: ZustandStore<ModelInfoState>
) {}

export default LiveModelBuilder;
