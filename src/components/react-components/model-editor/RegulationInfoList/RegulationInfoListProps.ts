import type { StringProviderInt } from '../../../../services/global/StringProvider/StringProviderInt';
import type { ModelEditorInt } from '../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type { Regulation, RegulationVariables } from '../../../../types';

export type RegulationInfoListProps = {
  height: string;
  width: string;
  variableRegulations: Regulation[];

  hoverRegulation: RegulationVariables | undefined;
  selectedRegulation: RegulationVariables | undefined;

  modelEditorServ: ModelEditorInt;
  stringProviderServ: StringProviderInt;

  variablesStore: ZustandStore<VariablesStatus>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
