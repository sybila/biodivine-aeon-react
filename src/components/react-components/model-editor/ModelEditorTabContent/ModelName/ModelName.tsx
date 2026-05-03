import { useMemo } from 'react';
import InvisibleInputReact from '../../../lit-wrappers/InvisibleInputReact';
import type { ModelNameProps } from './ModelNameProps';

const ModelName: React.FC<ModelNameProps> = ({
  modelEditorServ,
  messageServ,
  stringProviderServ,

  tabStore,
  modelInfoStore,
  helpHoverStore,
}) => {
  const modelName = modelInfoStore((state) => state.modelName);
  const tabState = tabStore((state) => state);

  const isActiveWitness = useMemo(() => {
    const activeTab = tabState.getActiveTab();
    return activeTab?.type === 'Witness';
  }, [tabState]);

  return (
    <InvisibleInputReact
      contMinHeight="35px"
      contMaxHeight="35px"
      contMinWidth="488px"
      contMaxWidth="488px"
      textBoxMinWidth="488px"
      textBoxMaxWidth="488px"
      textBoxMinHeight="30px"
      textBoxMaxHeight="30px"
      fontSize="22px"
      placeholder="Model Name"
      textAlign="center"
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
      onMouseEnter={(e: React.MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e.nativeEvent,
            modelName.length > 0 ? modelName : stringProviderServ.ToolTips.ModelEditorTooltips.changeModelName(),
            true,
            40
          )
      }
      onMouseLeave={() => helpHoverStore.getState().clear()}
    />
  );
};

export default ModelName;
