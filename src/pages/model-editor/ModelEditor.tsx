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
import ImportExportTabContent from "../../components/react-components/model-editor/ImportExportTabContent/ImportExportTabContent";

type TabTypeME =
  | "Start Computation"
  | "Import/Export"
  | "Model Editor"
  | "Control-Enabled Editor"
  | "Phenotype Editor"
  | null;

const ModelEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabTypeME>(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Start Computation":
        return <div>Start Computation Content</div>;
      case "Import/Export":
        return <ImportExportTabContent />;
      case "Model Editor":
        return <div>Model Editor Content</div>;
      case "Control-Enabled Editor":
        return <div>Control-Enabled Editor Content</div>;
      case "Phenotype Editor":
        return <div>Phenotype Editor Content</div>;
      default:
        return null;
    }
  };

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
          isActive={activeTab === "Start Computation"}
          onClick={() => showHideTab("Start Computation")}
          iconSrc={PlayIcon}
          iconAlt="Play"
          showTag={true}
          tagText="Start Computation"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === "Import/Export"}
          onClick={() => showHideTab("Import/Export")}
          iconSrc={FileIcon}
          iconAlt="File"
          showTag={true}
          tagText="Import/Export"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === "Model Editor"}
          onClick={() => showHideTab("Model Editor")}
          iconSrc={ModelIcon}
          iconAlt="Model"
          showTag={true}
          tagText="Model Editor"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === "Control-Enabled Editor"}
          onClick={() => showHideTab("Control-Enabled Editor")}
          iconSrc={ControlIcon}
          iconAlt="Control"
          showTag={true}
          tagText="Control-Enabled Editor"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === "Phenotype Editor"}
          onClick={() => showHideTab("Phenotype Editor")}
          iconSrc={PhenotypeIcon}
          iconAlt="Phenotype"
          showTag={true}
          tagText="Phenotype Editor"
        ></IconButtonReact>
      </SideButtonMenu>

      <ContentTab
        showTab={activeTab !== null}
        onClose={() => showHideTab(null)}
        headerText={activeTab ?? ""}
      >
        {renderTabContent()}
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
