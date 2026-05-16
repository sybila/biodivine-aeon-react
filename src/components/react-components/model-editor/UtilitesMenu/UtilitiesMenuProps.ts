import type { StringProviderInt } from '../../../../services/global/StringProvider/StringProviderInt';
import type { ModelVisualizationInt } from '../../../../services/model-editor/ModelVisualization/ModelVisualizationInt';
import type { SearchAndFilterHelpersInt } from '../../../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type UtilitiesMenuProps = {
  modelVisualization: ModelVisualizationInt;
  searchAndFilterHelpersServ: SearchAndFilterHelpersInt;
  stringProviderServ: StringProviderInt;

  variablesStore: ZustandStore<VariablesStatus>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
