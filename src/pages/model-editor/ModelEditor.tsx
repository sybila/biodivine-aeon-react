import { useState } from 'react';
import SideButtonMenu from '../../components/react-components/global/SideButtonMenu/SideButtonMenu';
import ModelEditorCanvas from '../../components/react-components/model-editor/ModelEditorCanvas/ModelEditorCanvas';
import IconButtonReact from '../../components/react-components/lit-wrappers/IconButtonReact';
import ContentTab from '../../components/react-components/global/ContentTab/ContentTab';

import PlayIcon from '../../assets/icons/play_circle_filled-48px.svg';
import FileIcon from '../../assets/icons/file_copy-48px.svg';
import ModelIcon from '../../assets/icons/model-48px.svg';
import ControlIcon from '../../assets/icons/control-enabled-48px.svg';
import EyeIcon from '../../assets/icons/eye.svg';

import ImportExportTabContent from '../../components/react-components/model-editor/ImportExportTabContent/ImportExportTabContent';
import ModelEditorTabContent from '../../components/react-components/model-editor/ModelEditorTabContent/ModelEditorTabContent';
import StartCompTabContent from '../../components/react-components/model-editor/StartCompTabContent/StartCompTabContent';
import ControlEditorTabContent from '../../components/react-components/model-editor/ControlEditorTabContent/ControlEditorTabContent';
import VisualOptionsTabContent from '../../components/react-components/model-editor/VisualOptionsTabContent/VisualOptionsTabContent';

type TabTypeME =
  | 'Start Computation'
  | 'Import/Export'
  | 'Model Editor'
  | 'Control Editor'
  | 'Visual Options'
  | null;

const ModelEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabTypeME>(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Start Computation':
        return <StartCompTabContent />;
      case 'Import/Export':
        return <ImportExportTabContent />;
      case 'Model Editor':
        return <ModelEditorTabContent />;
      case 'Control Editor':
        return <ControlEditorTabContent />;
      case 'Visual Options':
        return <VisualOptionsTabContent />;
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
          isActive={activeTab === 'Start Computation'}
          onClick={() => showHideTab('Start Computation')}
          iconSrc={PlayIcon}
          iconAlt="Play"
          showTag={true}
          tagText="Start Computation"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === 'Import/Export'}
          onClick={() => showHideTab('Import/Export')}
          iconSrc={FileIcon}
          iconAlt="File"
          showTag={true}
          tagText="Import/Export"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === 'Model Editor'}
          onClick={() => showHideTab('Model Editor')}
          iconSrc={ModelIcon}
          iconAlt="Model"
          showTag={true}
          tagText="Model Editor"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === 'Control Editor'}
          onClick={() => showHideTab('Control Editor')}
          iconSrc={ControlIcon}
          iconAlt="Control"
          showTag={true}
          tagText="Control Editor"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === 'Visual Options'}
          onClick={() => showHideTab('Visual Options')}
          iconSrc={EyeIcon}
          iconAlt="Visual"
          showTag={true}
          tagText="Visual Options"
        ></IconButtonReact>
      </SideButtonMenu>

      <ContentTab
        showTab={activeTab !== null}
        onClose={() => showHideTab(null)}
        headerText={activeTab ?? ''}
      >
        {renderTabContent()}
      </ContentTab>

      <ModelEditorCanvas />
    </>
  );
};

export default ModelEditor;
