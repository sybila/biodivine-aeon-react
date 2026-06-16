import type { ModelEditorPageStringsInt } from '../../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { ControlEditorInt } from '../../../../../services/model-editor/ControlEditor/ControlEditorInt';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';
import type { Oscillation } from '../../../../../types';

export type PhenotypeOscillationButtonProps = {
  controlEditorServ: ControlEditorInt;
  oscillationValue: Oscillation;
  setOscillationValue: (value: Oscillation) => void;
  compWidth?: string;

  pageStringProviderServ: ModelEditorPageStringsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
