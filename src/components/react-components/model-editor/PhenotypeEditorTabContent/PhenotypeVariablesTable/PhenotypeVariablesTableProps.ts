import type { LoadingInt } from '../../../../../services/global/Loading/LoadingInt';
import type { MessageInt } from '../../../../../services/global/Message/MessageInt';
import type { ModelEditorPageStringsInt } from '../../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { PhenotypeEditorInt } from '../../../../../services/model-editor/ControlEditor/PhenotypeEditor/PhenotypeEditorInt';
import type { SearchAndFilterHelpersInt } from '../../../../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { ControlStatus } from '../../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { VariablesStatus } from '../../../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { ModelEditorStatus } from '../../../../../stores/ModelEditor/ModelEditorStatus';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type PhenotypeVariablesTableProps = {
  phenotypeEditorServ: PhenotypeEditorInt;
  searchAndFilterHelpersServ: SearchAndFilterHelpersInt;
  pageStringProviderServ: ModelEditorPageStringsInt;
  messageServ: MessageInt;
  loadingServ: LoadingInt;

  variablesStore: ZustandStore<VariablesStatus>;
  controlStore: ZustandStore<ControlStatus>;
  modelEditorStatusStore: ZustandStore<ModelEditorStatus>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
