import type { LoadingInt } from '../../../../services/global/Loading/LoadingInt';
import type { ModelEditorPageStringsInt } from '../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { ModelVisualizationInt } from '../../../../services/model-editor/ModelVisualization/ModelVisualizationInt';
import type { SearchAndFilterHelpersInt } from '../../../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../../../stores/ModelEditor/ModelEditorStatus';
import type { UndoRedoState } from '../../../../stores/UndoRedo/UndoRedoState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type UtilitiesMenuProps = {
  modelVisualization: ModelVisualizationInt;
  loadingServ: LoadingInt;
  searchAndFilterHelpersServ: SearchAndFilterHelpersInt;
  pageStringProviderServ: ModelEditorPageStringsInt;

  variablesStore: ZustandStore<VariablesStatus>;
  helpHoverStore: ZustandStore<HelpHoverState>;
  modelUndoRedoStore: ZustandStore<UndoRedoState>;
  modelEditorStatusStore: ZustandStore<ModelEditorStatus>;
};
