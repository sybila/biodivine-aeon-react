import { useMemo } from 'react';

import useModelInfoStore from '../../../../../stores/LiveModel/useModelInfoStore';
import useTabsStore from '../../../../../stores/Navigation/useTabsStore';
import { Message } from '../../../../lit-components/message-wrapper';
import InvisibleInputReact from '../../../lit-wrappers/InvisibleInputReact';
import type { ModelNameProps } from './ModelNameProps';

const ModelName: React.FC<ModelNameProps> = ({ modelEditorServ }) => {
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
          modelEditorServ.setModelName(value);
        }
      }}
    />
  );
};

export default ModelName;
