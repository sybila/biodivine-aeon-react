import { useEffect, useState } from 'react';
import ContentTab from '../../components/react-components/global/ContentTab/ContentTab';
import SideButtonMenu from '../../components/react-components/global/SideButtonMenu/SideButtonMenu';
import IconButtonReact from '../../components/react-components/lit-wrappers/IconButtonReact';
import ModelEditorCanvas from '../../components/react-components/model-editor/ModelEditorCanvas/ModelEditorCanvas';

import ControlIcon from '../../assets/icons/control-enabled-48px.svg';
import EyeIcon from '../../assets/icons/eye.svg';
import FileIcon from '../../assets/icons/file_copy-48px.svg';
import HelpIcon from '../../assets/icons/help.svg';
import ModelIcon from '../../assets/icons/model-48px.svg';
import PlayIcon from '../../assets/icons/play_circle_filled-48px.svg';
import RedoIcon from '../../assets/icons/redo.svg';
import UndoIcon from '../../assets/icons/undo.svg';

import KeepAlive from 'react-activation';
import HelpTabContent from '../../components/react-components/global/HelpTabContent/HelpTabContent';
import ControlEditorTabContent from '../../components/react-components/model-editor/ControlEditorTabContent/ControlEditorTabContent';
import ExportTabContent from '../../components/react-components/model-editor/ExportTabContent/ExportTabContent';
import FloatMenu from '../../components/react-components/model-editor/FloatMenu/FloatMenu';
import ImportExportTabContent from '../../components/react-components/model-editor/ImportExportTabContent/ImportExportTabContent';
import ModelEditorTabContent from '../../components/react-components/model-editor/ModelEditorTabContent/ModelEditorTabContent';
import StartCompTabContent from '../../components/react-components/model-editor/StartCompTabContent/StartCompTabContent';
import UtilitiesMenu from '../../components/react-components/model-editor/UtilitesMenu/UtilitiesMenu';
import VisualOptionsTabContent from '../../components/react-components/model-editor/VisualOptionsTabContent/VisualOptionsTabContent';
import type { MenuTabButton, MenuTabTypeME, ModelType } from '../../types';
import type { ModelEditorProps } from './ModelEditorProps';

const ModelEditor: React.FC<ModelEditorProps> = ({
  liveModelServ,
  modelVisualization,
  modelEditorServ,
  controlEditorServ,
  computationManagerServ,
  searchAndFilterHelpersServ,
  fileConvertorsServ,
  openCloseOperationsServ,
  warningServ,
  messageServ,
  loadingServ,
  stringProviderServ,

  modelEditorStatusStore,
  tabStore,
  resultsStatusStore,
  controlStore,
  regulationsStore,
  variablesStore,
  updateFunctionsStore,
  modelInfoStore,
  loadedModelStore,
  modelUndoRedoStore,
  helpHoverStore,
}) => {
  const [activeTab, setActiveTab] = useState<MenuTabTypeME>(null);
  const modelType: ModelType = loadedModelStore(
    (state) => state.loadedModelType
  );

  const isWitness = modelType === 'witness';

  useEffect(() => {
    if (
      (isWitness &&
        (activeTab === 'Start Computation' || activeTab === 'Import/Export')) ||
      (!isWitness && activeTab === 'Export Witness')
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
            openCloseOperationsServ={openCloseOperationsServ}
            warningServ={warningServ}
            messageServ={messageServ}
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
            stringProviderServ={stringProviderServ}
            regulationsStore={regulationsStore}
            variablesStore={variablesStore}
            updateFunctionsStore={updateFunctionsStore}
            tabStore={tabStore}
            modelInfoStore={modelInfoStore}
            modelEditorStatusStore={modelEditorStatusStore}
            helpHoverStore={helpHoverStore}
          />
        );
      case 'Control Editor':
        return (
          <ControlEditorTabContent
            liveModelServ={liveModelServ}
            controlEditorServ={controlEditorServ}
            searchAndFilterHelpersServ={searchAndFilterHelpersServ}
            stringProviderServ={stringProviderServ}
            loadingServ={loadingServ}
            controlStore={controlStore}
            variablesStore={variablesStore}
            modelEditorStatusStore={modelEditorStatusStore}
            helpHoverStore={helpHoverStore}
          />
        );
      case 'Visual Options':
        return (
          <VisualOptionsTabContent
            modelVisualization={modelVisualization}
            stringProviderServ={stringProviderServ}
            helpHoverStore={helpHoverStore}
          />
        );
      case 'Help':
        return (
          <HelpTabContent
            text={
              isWitness
                ? stringProviderServ.HelpTexts.witness()
                : stringProviderServ.HelpTexts.modelEditor()
            }
          />
        );
      default:
        return null;
    }
  };

  const showHideTab = (tabType: MenuTabTypeME) => {
    if (activeTab === tabType) {
      setActiveTab(null);
      return;
    }

    setActiveTab(tabType);
  };

  return (
    <>
      <UtilitiesMenu
        modelVisualization={modelVisualization}
        searchAndFilterHelpersServ={searchAndFilterHelpersServ}
        stringProviderServ={stringProviderServ}
        variablesStore={variablesStore}
        helpHoverStore={helpHoverStore}
      />

      <SideButtonMenu>
        {modelType !== 'witness' ? (
          <IconButtonReact
            ref={(el) =>
              modelEditorStatusStore
                .getState()
                .setMenuTabButtonRef('Start Computation', el as MenuTabButton)
            }
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
            ref={(el) =>
              modelEditorStatusStore
                .getState()
                .setMenuTabButtonRef('Import/Export', el as MenuTabButton)
            }
            isActive={activeTab === 'Import/Export'}
            onClick={() => showHideTab('Import/Export')}
            iconSrc={FileIcon}
            iconAlt="File"
            showTag={true}
            tagText="Import/Export"
          ></IconButtonReact>
        ) : (
          <IconButtonReact
            ref={(el) =>
              modelEditorStatusStore
                .getState()
                .setMenuTabButtonRef('Export Witness', el as MenuTabButton)
            }
            isActive={activeTab === 'Export Witness'}
            onClick={() => showHideTab('Export Witness')}
            iconSrc={FileIcon}
            iconAlt="File"
            showTag={true}
            tagText="Export Witness"
          ></IconButtonReact>
        )}
        <IconButtonReact
          ref={(el) =>
            modelEditorStatusStore
              .getState()
              .setMenuTabButtonRef('Model Editor', el as MenuTabButton)
          }
          isActive={activeTab === 'Model Editor'}
          onClick={() => showHideTab('Model Editor')}
          iconSrc={ModelIcon}
          iconAlt="Model"
          showTag={true}
          tagText="Model Editor"
        ></IconButtonReact>
        <IconButtonReact
          ref={(el) =>
            modelEditorStatusStore
              .getState()
              .setMenuTabButtonRef('Control Editor', el as MenuTabButton)
          }
          isActive={activeTab === 'Control Editor'}
          onClick={() => showHideTab('Control Editor')}
          iconSrc={ControlIcon}
          iconAlt="Control"
          showTag={true}
          tagText="Control Editor"
        ></IconButtonReact>
        <IconButtonReact
          ref={(el) =>
            modelEditorStatusStore
              .getState()
              .setMenuTabButtonRef('Visual Options', el as MenuTabButton)
          }
          isActive={activeTab === 'Visual Options'}
          onClick={() => showHideTab('Visual Options')}
          iconSrc={EyeIcon}
          iconAlt="Visual"
          showTag={true}
          tagText="Visual Options"
        ></IconButtonReact>
        <IconButtonReact
          ref={(el) =>
            modelEditorStatusStore
              .getState()
              .setMenuTabButtonRef('Help', el as MenuTabButton)
          }
          isActive={activeTab === 'Help'}
          onClick={() => showHideTab('Help')}
          iconSrc={HelpIcon}
          iconAlt="Help"
          showTag={true}
          tagText="Help"
        />
        {modelType !== 'witness' ? (
          <>
            <IconButtonReact
              isActive={false}
              onClick={() => modelUndoRedoStore.getState().undo()}
              iconSrc={UndoIcon}
              iconAlt="U"
              showTag={true}
              tagText="Undo"
            />
            <IconButtonReact
              isActive={false}
              onClick={() => modelUndoRedoStore.getState().redo()}
              iconSrc={RedoIcon}
              iconAlt="R"
              showTag={true}
              tagText="Redo"
            />
          </>
        ) : null}
      </SideButtonMenu>

      <ContentTab
        overflowY="auto"
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
