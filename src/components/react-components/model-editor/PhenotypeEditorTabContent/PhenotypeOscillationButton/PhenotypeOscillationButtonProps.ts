import type { ModelEditorPageStringsInt } from '../../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { PhenotypeEditorInt } from '../../../../../services/model-editor/ControlEditor/PhenotypeEditor/PhenotypeEditorInt';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';
import type { Oscillation } from '../../../../../types/types';

export type PhenotypeOscillationButtonProps = {
  phenotypeEditorServ: PhenotypeEditorInt;
  oscillationValue: Oscillation;
  setOscillationValue: (value: Oscillation) => void;
  compWidth?: string;

  pageStringProviderServ: ModelEditorPageStringsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
