import { useMemo } from 'react';
import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import InvisibleInputReact from '../../../lit-wrappers/InvisibleInputReact';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';
import type { ModelDescriptionProps } from './ModelDescriptionProps';

const ModelDescription: React.FC<ModelDescriptionProps> = ({
  setShowModelDescription,
  modelEditorServ,
  messageServ,

  tabStore,
  modelInfoStore,

  setHelpHover,
  setHelpHoverText,
  clearHelpHover,
}) => {
  const modelDescription = modelInfoStore((state) =>
    state.getModelDescription()
  );

  const tabState = tabStore((state) => state);

  const isActiveWittness = useMemo(() => {
    const activeTab = tabState.getActiveTab();
    return activeTab?.type === 'Witness';
  }, [tabState]);

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
          handleClick={() => {
            setHelpHoverText(true);
            setShowModelDescription(false);
          }}
          onMouseEnter={(e: React.MouseEvent) => setHelpHover(e, false)}
          onMouseLeave={() => clearHelpHover()}
          active={true}
        />
      </section>
      <InvisibleInputReact
        contMinHeight="400px"
        contMaxHeight="400px"
        contMinWidth="479px"
        contMaxWidth="479px"
        textBoxMinHeight="400px"
        textBoxMaxHeight="400px"
        textBoxMinWidth="475px"
        textBoxMaxWidth="475px"
        placeholder="(model description)"
        textAlign="start"
        fontSize="14px"
        multiLine={true}
        value={modelDescription}
        handleChange={(value) => {
          if (isActiveWittness) {
            messageServ.showError(
              'Cannot change model description while on Witness tab. Change to Model Editor tab and try again.'
            );
          } else {
            modelEditorServ.setModelDescription(value);
          }
        }}
      />
    </section>
  );
};

export default ModelDescription;
