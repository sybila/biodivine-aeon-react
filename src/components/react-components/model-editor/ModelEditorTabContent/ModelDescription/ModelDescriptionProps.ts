import type { MessageInt } from '../../../../../services/global/Message/MessageInt';
import type { StringProviderInt } from '../../../../../services/global/StringProvider/StringProviderInt';
import type { ModelEditorInt } from '../../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { ModelInfoState } from '../../../../../stores/LiveModel/ModelInfoStore/ModelInfoState';
import type { TabsState } from '../../../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type ModelDescriptionProps = {
  setShowModelDescription: (show: boolean) => void;
  modelEditorServ: ModelEditorInt;
  messageServ: MessageInt;

  tabStore: ZustandStore<TabsState>;
  modelInfoStore: ZustandStore<ModelInfoState>;

  setHelpHover: (e: React.MouseEvent, show: boolean) => void;
  setHelpHoverText: (show: boolean) => void;
  clearHelpHover: () => void;
};
