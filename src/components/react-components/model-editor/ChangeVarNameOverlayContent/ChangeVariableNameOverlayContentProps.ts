import type { ModelEditorInt } from '../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { VariablesStatus } from '../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type ChangeVariableNameOverlayContentProps = {
  varId: number;

  modelEditorServ: ModelEditorInt;

  variablesStore: ZustandStore<VariablesStatus>;
};
