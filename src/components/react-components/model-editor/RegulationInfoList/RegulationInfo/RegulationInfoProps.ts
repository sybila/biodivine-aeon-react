import type { ModelEditorInt } from '../../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { Regulation } from '../../../../../types';

export type RegulationInfoProps = Regulation & {
  hover: boolean;
  selected: boolean;
  modelEditorServ: ModelEditorInt;
};
