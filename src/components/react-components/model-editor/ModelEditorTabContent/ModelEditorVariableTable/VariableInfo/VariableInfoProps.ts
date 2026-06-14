import type { StringProviderInt } from '../../../../../../services/global/StringProvider/StringProviderInt';
import type { ModelEditorInt } from '../../../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { HelpHoverState } from '../../../../../../stores/HelpHover/HelpHoverState';
import type { RegulationsStatus } from '../../../../../../stores/LiveModel/RegulationsStore/RegulationsStatus';
import type { UpdateFunctionsState } from '../../../../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ZustandStore } from '../../../../../../stores/ZustandStoreType';
import type { RegulationVariables, Variable } from '../../../../../../types';

export type VariableInfoProps = Variable & {
  hoverVariable: boolean;
  selectedVariable: boolean;
  hoverRegulation: RegulationVariables | undefined;
  selectedRegulatorIds:  Set<number> | undefined;
  exposeSetExtend: (extendFunction: (extend: boolean) => void) => void;
  setVariableInfoRef: (id: number, element: HTMLElement | null) => void;

  modelEditorServ: ModelEditorInt;
  stringProviderServ: StringProviderInt;

  regulationsStore: ZustandStore<RegulationsStatus>;
  variablesStore: ZustandStore<VariablesStatus>;
  updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
