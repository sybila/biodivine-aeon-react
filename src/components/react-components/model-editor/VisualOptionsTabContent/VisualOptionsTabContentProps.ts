import type { StringProviderInt } from '../../../../services/global/StringProvider/StringProviderInt';
import type { ModelVisualizationInt } from '../../../../services/model-editor/ModelVisualization/ModelVisualizationInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type VisualOptionsTabContentProps = {
  modelVisualization: ModelVisualizationInt;

  stringProviderServ: StringProviderInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
