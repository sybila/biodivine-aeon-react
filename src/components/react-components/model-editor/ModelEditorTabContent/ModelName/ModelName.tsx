import { useMemo } from 'react';
import ModelEditor from '../../../../../services/model-editor/ModelEditor/ModelEditor';
import useModelInfoStore from '../../../../../stores/LiveModel/useModelInfoStore';
import useTabsStore from '../../../../../stores/Navigation/useTabsStore';
import InvisibleInputReact from '../../../lit-wrappers/InvisibleInputReact';
import { Message } from '../../../../lit-components/message-wrapper';

const ModelName: React.FC = () => {
  const modelName = useModelInfoStore((state) => state.modelName);
  const tabStore = useTabsStore((state) => state);

  const isActiveWittness = useMemo(() => {
    const activeTab = tabStore.getActiveTab();
    return activeTab?.type === 'Witness';
  }, [tabStore]);

  return (
    <InvisibleInputReact
      compHeight="35px"
      compWidth="99%"
      singleFontSize="22px"
      placeholder="Model Name"
      singleTextAlign="center"
      value={modelName ?? undefined}
      handleChange={(value) => {
        if (isActiveWittness) {
          Message.showError(
            'Cannot change model name while on Witness tab. Change to Model Editor tab and try again.'
          );
        } else {
          ModelEditor.setModelName(value);
        }
      }}
    />
  );
};

export default ModelName;
