import type { ModelEditorPageStringsInt } from '../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { ModelVisualizationInt } from '../../../../services/model-editor/ModelVisualization/ModelVisualizationInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type VisualOptionsTabContentProps = {
  modelVisualization: ModelVisualizationInt;

  pageStringProviderServ: ModelEditorPageStringsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
