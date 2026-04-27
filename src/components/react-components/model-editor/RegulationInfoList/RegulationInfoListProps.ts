import type { ModelEditorInt } from '../../../../services/model-editor/ModelEditor/ModelEditorInt';
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
  variablesStore: ZustandStore<VariablesStatus>;
};
