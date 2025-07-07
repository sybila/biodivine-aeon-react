import SideButtonMenu from "../../components/react-components/global/SideButtonMenu/SideButtonMenu";
import ModelEditorCanvas from "../../components/react-components/model-editor/ModelEditorCanvas/ModelEditorCanvas";
import IconButtonReact from "../../components/react-components/lit-wrappers/IconButtonReact";

import PlayIcon from "../../assets/icons/play_circle_filled-48px.svg";
import FileIcon from "../../assets/icons/file_copy-48px.svg";
import ModelIcon from "../../assets/icons/model-48px.svg";
import ControlIcon from "../../assets/icons/control-enabled-48px.svg";
import PhenotypeIcon from "../../assets/icons/phenotype-48px.svg";

const ModelEditor: React.FC = () => {
  return (
    <>
      <SideButtonMenu>
        <IconButtonReact
          iconSrc={PlayIcon}
          iconAlt="Play"
          showTag={true}
          tagText="Start Computation"
        ></IconButtonReact>
        <IconButtonReact
          iconSrc={FileIcon}
          iconAlt="File"
          showTag={true}
          tagText="Import/Export"
        ></IconButtonReact>
        <IconButtonReact
          iconSrc={ModelIcon}
          iconAlt="Model"
          showTag={true}
          tagText="Model Editor"
        ></IconButtonReact>
        <IconButtonReact
          iconSrc={ControlIcon}
          iconAlt="Control"
          showTag={true}
          tagText="Control-Enabled Editor"
        ></IconButtonReact>
        <IconButtonReact
          iconSrc={PhenotypeIcon}
          iconAlt="Phenotype"
          showTag={true}
          tagText="Phenotype Editor"
        ></IconButtonReact>
      </SideButtonMenu>
      <ModelEditorCanvas></ModelEditorCanvas>
    </>
  );
};

export default ModelEditor;
