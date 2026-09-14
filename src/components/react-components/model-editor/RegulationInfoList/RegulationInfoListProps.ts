import type { ModelEditorPageStringsInt } from '../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { ModelEditorInt } from '../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type { Regulation, RegulationVariables } from '../../../../types/types';

export type RegulationInfoListProps = {
  height: string;
  width: string;
  variableRegulations: Regulation[];

  hoverRegulation: RegulationVariables | undefined;
  selectedRegulatorIds: Set<number> | undefined;

  modelEditorServ: ModelEditorInt;
  pageStringProviderServ: ModelEditorPageStringsInt;

  variablesStore: ZustandStore<VariablesStatus>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
