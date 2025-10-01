import { useMemo } from 'react';
import ModelEditor from '../../../../../services/model-editor/ModelEditor/ModelEditor';
import useModelInfoStore from '../../../../../stores/LiveModel/useModelInfoStore';
import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import InvisibleInputReact from '../../../lit-wrappers/InvisibleInputReact';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';
import useTabsStore from '../../../../../stores/Navigation/useTabsStore';
import { Message } from '../../../../lit-components/message-wrapper';

const ModelDescription: React.FC<{
  setShowModelDescription: (show: boolean) => void;
}> = ({ setShowModelDescription }) => {
  const modelDescription = useModelInfoStore((state) =>
    state.getModelDescription()
  );

  const tabStore = useTabsStore((state) => state);

  const isActiveWittness = useMemo(() => {
    const activeTab = tabStore.getActiveTab();
    return activeTab?.type === 'Witness';
  }, [tabStore]);

  return (
    <section className="h-fit w-full flex flex-col items-center gap-3">
      <section className="flex flex-row items-center justify-between w-full h-fit gap-1">
        <DotHeaderReact
          compWidth="60%"
          headerText="Model Description"
          justifyHeader="start"
        />

        <TextButtonReact
          className="mr-1"
          compWidth="35%"
          textFontSize="13px"
          text="Hide Model description"
          handleClick={() => setShowModelDescription(false)}
          active={true}
        />
      </section>
      <InvisibleInputReact
        compHeight="400px"
        compWidth="99%"
        placeholder="(model description)"
        multiTextAlign="start"
        multiFontSize="14px"
        multiLine={true}
        value={modelDescription}
        handleChange={(value) => {
          if (isActiveWittness) {
            Message.showError(
              'Cannot change model description while on Witness tab. Change to Model Editor tab and try again.'
            );
          } else {
            ModelEditor.setModelDescription(value);
          }
        }}
      />
    </section>
  );
};

export default ModelDescription;
