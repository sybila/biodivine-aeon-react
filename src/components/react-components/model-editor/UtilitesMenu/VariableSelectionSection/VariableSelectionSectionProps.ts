import type { LoadingInt } from '../../../../../services/global/Loading/LoadingInt';
import type { ModelEditorPageStringsInt } from '../../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { ModelVisualizationInt } from '../../../../../services/model-editor/ModelVisualization/ModelVisualizationInt';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { ModelEditorStatus } from '../../../../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type VariableSelectionSectionProps = {
  variableIds: Array<number>;

  modelVisualizationServ: ModelVisualizationInt;
  loadingServ: LoadingInt;
  pageStringProviderServ: ModelEditorPageStringsInt;

  modelEditorStatusStore: ZustandStore<ModelEditorStatus>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
