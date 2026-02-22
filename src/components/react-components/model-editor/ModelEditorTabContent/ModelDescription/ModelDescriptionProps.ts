import type { ModelEditorInt } from '../../../../../services/model-editor/ModelEditor/ModelEditorInt';
import type { ModelInfoState } from '../../../../../stores/LiveModel/ModelInfoStore/ModelInfoState';
import type { TabsState } from '../../../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';

export type ModelDescriptionProps = {
  setShowModelDescription: (show: boolean) => void;
  modelEditorServ: ModelEditorInt;
  tabStore: ZustandStore<TabsState>;
  modelInfoStore: ZustandStore<ModelInfoState>;
};
