import { useState } from 'react';
import SideButtonMenu from '../../components/react-components/global/SideButtonMenu/SideButtonMenu';
import ModelEditorCanvas from '../../components/react-components/model-editor/ModelEditorCanvas/ModelEditorCanvas';
import IconButtonReact from '../../components/react-components/lit-wrappers/IconButtonReact';
import PopUpBarReact from '../../components/react-components/lit-wrappers/PopUpBarReact';
import NavigationDockContent from '../../components/react-components/global/NavigationDockContent/NavigationDockContent';
import ContentTab from '../../components/react-components/global/ContentTab/ContentTab';

import PlayIcon from '../../assets/icons/play_circle_filled-48px.svg';
import FileIcon from '../../assets/icons/file_copy-48px.svg';
import ModelIcon from '../../assets/icons/model-48px.svg';
import ControlIcon from '../../assets/icons/control-enabled-48px.svg';
import PhenotypeIcon from '../../assets/icons/phenotype-48px.svg';
import DockIcon from '../../assets/icons/dock-arrow.svg';
import ImportExportTabContent from '../../components/react-components/model-editor/ImportExportTabContent/ImportExportTabContent';
import ModelEditorTabContent from '../../components/react-components/model-editor/ModelEditorTabContent/ModelEditorTabContent';
import StartCompTabContent from '../../components/react-components/model-editor/StartCompTabContent/StartCompTabContent';
import OverlayWindowReact from '../../components/react-components/lit-wrappers/OverlayWindowReact';
import ComputeEngineWindowContent from '../../components/react-components/global/ComputeEngineWindowContent/ComputeEngineWindowContent';
import TwoSidedTextReact from '../../components/react-components/lit-wrappers/TwoSidedTextReact';
import ResultsWindowContent from '../../components/react-components/global/ResultsWindowContent/ResultsWindowContent';

type TabTypeME =
  | 'Start Computation'
  | 'Import/Export'
  | 'Model Editor'
  | 'Control-Enabled Editor'
  | 'Phenotype Editor'
  | null;

type OverlayWindowTypeME = 'Compute Engine' | 'Results' | null;

const ModelEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabTypeME>(null);
  const [activeOverlayWindow, setActiveOverlayWindow] =
    useState<OverlayWindowTypeME | null>(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Start Computation':
        return <StartCompTabContent />;
      case 'Import/Export':
        return <ImportExportTabContent />;
      case 'Model Editor':
        return <ModelEditorTabContent />;
      case 'Control-Enabled Editor':
        return <div>Control-Enabled Editor Content</div>;
      case 'Phenotype Editor':
        return <div>Phenotype Editor Content</div>;
      default:
        return null;
    }
  };

  const renderOverlayWindowContent = () => {
    switch (activeOverlayWindow) {
      case 'Compute Engine':
        return <ComputeEngineWindowContent />;
      case 'Results':
        return <ResultsWindowContent />;
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
      <TwoSidedTextReact
        className="absolute top-1 right-3 z-10 select-none pointer-events-none"
        rightText="Aeon/"
        leftText="BIODIVINE"
      />

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
          isActive={activeTab === 'Control-Enabled Editor'}
          onClick={() => showHideTab('Control-Enabled Editor')}
          iconSrc={ControlIcon}
          iconAlt="Control"
          showTag={true}
          tagText="Control-Enabled Editor"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === 'Phenotype Editor'}
          onClick={() => showHideTab('Phenotype Editor')}
          iconSrc={PhenotypeIcon}
          iconAlt="Phenotype"
          showTag={true}
          tagText="Phenotype Editor"
        ></IconButtonReact>
      </SideButtonMenu>

      <ContentTab
        showTab={activeTab !== null}
        onClose={() => showHideTab(null)}
        headerText={activeTab ?? ''}
      >
        {renderTabContent()}
      </ContentTab>

      {activeOverlayWindow !== null ? (
        <OverlayWindowReact
          compWidth="100%"
          compHeight="100%"
          windWidth="fit-content"
          windMaxWidth="80%"
          showHeader={true}
          showCloseButton={true}
          headerText={activeOverlayWindow}
          handleCloseClick={() => setActiveOverlayWindow(null)}
          handleBackgroundClick={() => setActiveOverlayWindow(null)}
        >
          {renderOverlayWindowContent()}
        </OverlayWindowReact>
      ) : null}

      <PopUpBarReact
        className="absolute max-w-full bottom-[25px] left-1/2 -translate-x-1/2 z-999999990"
        iconSrc={DockIcon}
        iconAlt="Dock"
      >
        <NavigationDockContent
          handleComputeEngineClick={() =>
            setActiveOverlayWindow('Compute Engine')
          }
          handleResultsClick={() => setActiveOverlayWindow('Results')}
        />
      </PopUpBarReact>

      <ModelEditorCanvas />
    </>
  );
};

export default ModelEditor;
