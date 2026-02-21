import type { ModelEditorInt } from '../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { RegulationVariables } from '../../../../types';

export type RegulationInfoListProps = {
  varId: number;
  height: string;
  width: string;
  hoverRegulation: RegulationVariables | undefined;
  selectedRegulation: RegulationVariables | undefined;
  modelEditorServ: ModelEditorInt;
};
