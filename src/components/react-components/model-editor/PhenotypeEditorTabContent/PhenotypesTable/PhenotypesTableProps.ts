import type { ModelEditorPageStringsInt } from '../../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { PhenotypeEditorInt } from '../../../../../services/model-editor/ControlEditor/PhenotypeEditor/PhenotypeEditorInt';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { ControlStatus } from '../../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type PhenotypesTableProps = {
  phenotypeEditorServ: PhenotypeEditorInt;
  pageStringProviderServ: ModelEditorPageStringsInt;

  controlStore: ZustandStore<ControlStatus>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
