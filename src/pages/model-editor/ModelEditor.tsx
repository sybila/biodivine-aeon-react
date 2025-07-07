import SideButtonMenu from "../../components/react-components/global/SideButtonMenu/SideButtonMenu";
import ModelEditorCanvas from "../../components/react-components/model-editor/ModelEditorCanvas/ModelEditorCanvas";
import IconButtonReact from "../../components/react-components/lit-wrappers/IconButtonReact";
import PlayIcon from "../../assets/icons/play_circle_filled-48px.svg"

const ModelEditor: React.FC = () => {
  return (
    <>
      <SideButtonMenu>
        <IconButtonReact compHeight="60px" compWidth="100%" buttonSize="100%" iconSrc={PlayIcon} iconAlt="Play" showTag={true} tagWidth="100%" tagText="Start Computation" ></IconButtonReact>
      </SideButtonMenu>
      <ModelEditorCanvas></ModelEditorCanvas>
    </>
  );
};

export default ModelEditor;
