import type { ModelEditorPageStringsInt } from '../../../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { HelpHoverState } from '../../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../../stores/ZustandStoreType';

export type PhenotypeInfoProps = {
  id: number;
  name: string;
  selected: boolean;
  toggleSelect: (variableId: number) => void;

  pageStringProviderServ: ModelEditorPageStringsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
