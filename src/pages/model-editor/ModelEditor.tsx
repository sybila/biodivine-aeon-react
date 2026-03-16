import { useEffect, useState } from 'react';
import ContentTab from '../../components/react-components/global/ContentTab/ContentTab';
import SideButtonMenu from '../../components/react-components/global/SideButtonMenu/SideButtonMenu';
import IconButtonReact from '../../components/react-components/lit-wrappers/IconButtonReact';
import ModelEditorCanvas from '../../components/react-components/model-editor/ModelEditorCanvas/ModelEditorCanvas';

import ControlIcon from '../../assets/icons/control-enabled-48px.svg';
import EyeIcon from '../../assets/icons/eye.svg';
import FileIcon from '../../assets/icons/file_copy-48px.svg';
import ModelIcon from '../../assets/icons/model-48px.svg';
import PlayIcon from '../../assets/icons/play_circle_filled-48px.svg';

import KeepAlive from 'react-activation';
import ControlEditorTabContent from '../../components/react-components/model-editor/ControlEditorTabContent/ControlEditorTabContent';
import ExportTabContent from '../../components/react-components/model-editor/ExportTabContent/ExportTabContent';
import FloatMenu from '../../components/react-components/model-editor/FloatMenu/FloatMenu';
import ImportExportTabContent from '../../components/react-components/model-editor/ImportExportTabContent/ImportExportTabContent';
import ModelEditorTabContent from '../../components/react-components/model-editor/ModelEditorTabContent/ModelEditorTabContent';
import StartCompTabContent from '../../components/react-components/model-editor/StartCompTabContent/StartCompTabContent';
import VisualOptionsTabContent from '../../components/react-components/model-editor/VisualOptionsTabContent/VisualOptionsTabContent';
import type { ModelType } from '../../types';
import type { ModelEditorProps } from './ModelEditorProps';

type TabTypeME =
  | 'Start Computation'
  | 'Import/Export'
  | 'Export Witness'
  | 'Model Editor'
  | 'Control Editor'
  | 'Visual Options'
  | null;

const ModelEditor: React.FC<ModelEditorProps> = ({
  liveModelServ,
  modelVisualization,
  modelEditorServ,
  controlEditorServ,
  computationManagerServ,
  searchAndFilterHelpersServ,
  fileConvertorsServ,
  warningServ,
  messageServ,
  modelEditorStatusStore,
  tabStore,
  resultsStatusStore,
  controlStore,
  regulationsStore,
  variablesStore,
  updateFunctionsStore,
  modelInfoStore,
  loadedModelStore,
}) => {
  const [activeTab, setActiveTab] = useState<TabTypeME>(null);
  const modelType: ModelType = loadedModelStore(
    (state) => state.loadedModelType
  );

  useEffect(() => {
    if (
      (modelType === 'witness' &&
        (activeTab === 'Start Computation' || activeTab === 'Import/Export')) ||
      (modelType !== 'witness' && activeTab === 'Export Witness')
    ) {
      setActiveTab(null);
    }
  }, [modelType]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Start Computation':
        return (
          <StartCompTabContent
            liveModelServ={liveModelServ}
            computationManagerServ={computationManagerServ}
            warningServ={warningServ}
            tabStore={tabStore}
            resultsStatusStore={resultsStatusStore}
            controlStore={controlStore}
          />
        );
      case 'Import/Export':
        return (
          <ImportExportTabContent
            liveModelServ={liveModelServ}
            fileConvertorsServ={fileConvertorsServ}
            messageServ={messageServ}
          />
        );
      case 'Export Witness':
        return (
          <ExportTabContent
            liveModelServ={liveModelServ}
            fileConvertorsServ={fileConvertorsServ}
          />
        );
      case 'Model Editor':
        return (
          <ModelEditorTabContent
            liveModelServ={liveModelServ}
            modelEditorServ={modelEditorServ}
            searchAndFilterHelpersServ={searchAndFilterHelpersServ}
            messageServ={messageServ}
            regulationsStore={regulationsStore}
            variablesStore={variablesStore}
            updateFunctionsStore={updateFunctionsStore}
            tabStore={tabStore}
            modelInfoStore={modelInfoStore}
            modelEditorStatusStore={modelEditorStatusStore}
          />
        );
      case 'Control Editor':
        return (
          <ControlEditorTabContent
            liveModelServ={liveModelServ}
            controlEditorServ={controlEditorServ}
            searchAndFilterHelpersServ={searchAndFilterHelpersServ}
            controlStore={controlStore}
            variablesStore={variablesStore}
            modelEditorStatusStore={modelEditorStatusStore}
          />
        );
      case 'Visual Options':
        return (
          <VisualOptionsTabContent modelVisualization={modelVisualization} />
        );
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
        {modelType !== 'witness' ? (
          <IconButtonReact
            isActive={activeTab === 'Start Computation'}
            onClick={() => showHideTab('Start Computation')}
            iconSrc={PlayIcon}
            iconAlt="Play"
            showTag={true}
            tagText="Start Computation"
          ></IconButtonReact>
        ) : null}
        {modelType !== 'witness' ? (
          <IconButtonReact
            isActive={activeTab === 'Import/Export'}
            onClick={() => showHideTab('Import/Export')}
            iconSrc={FileIcon}
            iconAlt="File"
            showTag={true}
            tagText="Import/Export"
          ></IconButtonReact>
        ) : (
          <IconButtonReact
            isActive={activeTab === 'Export Witness'}
            onClick={() => showHideTab('Export Witness')}
            iconSrc={FileIcon}
            iconAlt="File"
            showTag={true}
            tagText="Export Witness"
          ></IconButtonReact>
        )}
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
        overflowY="hidden"
        showTab={activeTab !== null}
        onClose={() => showHideTab(null)}
        headerText={activeTab ?? ''}
      >
        {renderTabContent()}
      </ContentTab>

      <FloatMenu
        liveModelServ={liveModelServ}
        modelEditorServ={modelEditorServ}
        modelEditorStatusStore={modelEditorStatusStore}
        regulationsStore={regulationsStore}
      />

      <KeepAlive>
        <ModelEditorCanvas modelVisualization={modelVisualization} />
      </KeepAlive>
    </>
  );
};

export default ModelEditor;
