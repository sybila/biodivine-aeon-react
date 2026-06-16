import type { MessageInt } from '../../../../../services/global/Message/MessageInt';
import type { ModelEditorPageStringsInt } from '../../../../../services/global/StringProvider/ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { ModelEditorInt } from '../../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { ModelInfoState } from '../../../../../stores/LiveModel/ModelInfoStore/ModelInfoState';
import type { TabsState } from '../../../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type ModelNameProps = {
  modelEditorServ: ModelEditorInt;
  messageServ: MessageInt;
  pageStringProviderServ: ModelEditorPageStringsInt;

  tabStore: ZustandStore<TabsState>;
  modelInfoStore: ZustandStore<ModelInfoState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
