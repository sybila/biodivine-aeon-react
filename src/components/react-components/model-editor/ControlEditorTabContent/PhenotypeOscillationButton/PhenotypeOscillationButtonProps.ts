import type { ControlEditorInt } from '../../../../../services/model-editor/ControlEditor/ControlEditorInt';
import type { Oscillation } from '../../../../../types';

export type PhenotypeOscillationButtonProps = {
  controlEditorServ: ControlEditorInt;
  oscillationValue: Oscillation;
  setOscillationValue: (value: Oscillation) => void;
  compWidth?: string;
};
