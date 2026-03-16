import { useMemo } from 'react';
import InvisibleInputReact from '../../../lit-wrappers/InvisibleInputReact';
import type { ModelNameProps } from './ModelNameProps';

const ModelName: React.FC<ModelNameProps> = ({
  modelEditorServ,
  messageServ,

  tabStore,
  modelInfoStore,
}) => {
  const modelName = modelInfoStore((state) => state.modelName);
  const tabState = tabStore((state) => state);

  const isActiveWitness = useMemo(() => {
    const activeTab = tabState.getActiveTab();
    return activeTab?.type === 'Witness';
  }, [tabState]);

  return (
    <InvisibleInputReact
      compHeight="35px"
      compWidth="99%"
      singleFontSize="22px"
      placeholder="Model Name"
      singleTextAlign="center"
      value={modelName ?? undefined}
      handleChange={(value) => {
        if (isActiveWitness) {
          messageServ.showError(
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
