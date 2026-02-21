import type { ModelEditorInt } from '../../../../../services/model-editor/ModelEditor/ModelEditorInt';

export type ModelDescriptionProps = {
  setShowModelDescription: (show: boolean) => void;
  modelEditorServ: ModelEditorInt;
};
