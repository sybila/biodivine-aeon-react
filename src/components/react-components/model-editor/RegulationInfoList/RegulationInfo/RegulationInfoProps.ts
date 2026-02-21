import type { ModelEditorInt } from '../../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { VariablesStatus } from '../../../../../stores/LiveModel/VariableStore/VariablesStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';
import type { Regulation } from '../../../../../types';

export type RegulationInfoProps = Regulation & {
  hover: boolean;
  selected: boolean;
  modelEditorServ: ModelEditorInt;
  variablesStore: ZustandStore<VariablesStatus>;
};
