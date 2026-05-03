import type { StringProviderInt } from '../../../../../services/global/StringProvider/StringProviderInt';
import type { ModelEditorInt } from '../../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { VariablesStatus } from '../../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';
import type { Regulation } from '../../../../../types';

export type RegulationInfoProps = Regulation & {
  hover: boolean;
  selected: boolean;

  modelEditorServ: ModelEditorInt;
  stringProviderServ: StringProviderInt;

  variablesStore: ZustandStore<VariablesStatus>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
