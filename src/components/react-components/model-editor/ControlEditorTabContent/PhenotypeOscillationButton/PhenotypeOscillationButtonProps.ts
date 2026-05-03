import type { StringProviderInt } from '../../../../../services/global/StringProvider/StringProviderInt';
import type { ControlEditorInt } from '../../../../../services/model-editor/ControlEditor/ControlEditorInt';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';
import type { Oscillation } from '../../../../../types';

export type PhenotypeOscillationButtonProps = {
  controlEditorServ: ControlEditorInt;
  oscillationValue: Oscillation;
  setOscillationValue: (value: Oscillation) => void;
  compWidth?: string;

  stringProviderServ: StringProviderInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
