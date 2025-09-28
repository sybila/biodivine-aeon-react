import ModelEditor from '../../../../../services/model-editor/ModelEditor/ModelEditor';
import useModelInfoStore from '../../../../../stores/LiveModel/useModelInfoStore';
import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import InvisibleInputReact from '../../../lit-wrappers/InvisibleInputReact';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';

const ModelDescription: React.FC<{
  setShowModelDescription: (show: boolean) => void;
}> = ({ setShowModelDescription }) => {
  const modelDescription = useModelInfoStore((state) =>
    state.getModelDescription()
  );

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
          ModelEditor.setModelDescription(value);
        }}
      />
    </section>
  );
};

export default ModelDescription;
