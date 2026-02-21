import type { ModelEditorInt } from '../../../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { RegulationVariables, Variable } from '../../../../../../types';

export type VariableInfoProps = Variable & {
  hoverVariable: boolean;
  selectedVariable: boolean;
  hoverRegulation: RegulationVariables | undefined;
  selectedRegulation: RegulationVariables | undefined;
  modelEditorServ: ModelEditorInt;
};
