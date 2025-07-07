import { useState } from "react";
import SideButtonMenu from "../../components/react-components/global/SideButtonMenu/SideButtonMenu";
import ModelEditorCanvas from "../../components/react-components/model-editor/ModelEditorCanvas/ModelEditorCanvas";
import IconButtonReact from "../../components/react-components/lit-wrappers/IconButtonReact";
import PopUpBarReact from "../../components/react-components/lit-wrappers/PopUpBarReact";
import NavigationDockContent from "../../components/react-components/global/NavigationDockContent/NavigationDockContent";
import ContentTab from "../../components/react-components/global/ContentTab/ContentTab";

import PlayIcon from "../../assets/icons/play_circle_filled-48px.svg";
import FileIcon from "../../assets/icons/file_copy-48px.svg";
import ModelIcon from "../../assets/icons/model-48px.svg";
import ControlIcon from "../../assets/icons/control-enabled-48px.svg";
import PhenotypeIcon from "../../assets/icons/phenotype-48px.svg";
import DockIcon from "../../assets/icons/dock-arrow.svg";

type TabTypeME = "StartC" | "Imp/Exp" | "ModEd" | "ContrEd" | "PhenEd" | null;

const ModelEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabTypeME>(null);

  const showHideTab = (tabType: TabTypeME) => {
    if (activeTab === tabType) {
      setActiveTab(null);
      return;
    }

    setActiveTab(tabType);
  };

  return (
    <>
      <SideButtonMenu>
        <IconButtonReact
          isActive={activeTab === "StartC"}
          onClick={() => showHideTab("StartC")}
          iconSrc={PlayIcon}
          iconAlt="Play"
          showTag={true}
          tagText="Start Computation"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === "Imp/Exp"}
          onClick={() => showHideTab("Imp/Exp")}
          iconSrc={FileIcon}
          iconAlt="File"
          showTag={true}
          tagText="Import/Export"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === "ModEd"}
          onClick={() => showHideTab("ModEd")}
          iconSrc={ModelIcon}
          iconAlt="Model"
          showTag={true}
          tagText="Model Editor"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === "ContrEd"}
          onClick={() => showHideTab("ContrEd")}
          iconSrc={ControlIcon}
          iconAlt="Control"
          showTag={true}
          tagText="Control-Enabled Editor"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === "PhenEd"}
          onClick={() => showHideTab("PhenEd")}
          iconSrc={PhenotypeIcon}
          iconAlt="Phenotype"
          showTag={true}
          tagText="Phenotype Editor"
        ></IconButtonReact>
      </SideButtonMenu>

      <ContentTab showTab={activeTab !== null}>
        <div className="h-[600px] w-[300px]"></div>
      </ContentTab>

      <PopUpBarReact
        className="absolute max-w-full bottom-[25px] left-1/2 -translate-x-1/2 z-10"
        iconSrc={DockIcon}
        iconAlt="Dock"
      >
        <NavigationDockContent></NavigationDockContent>
      </PopUpBarReact>

      <ModelEditorCanvas></ModelEditorCanvas>
    </>
  );
};

export default ModelEditor;
