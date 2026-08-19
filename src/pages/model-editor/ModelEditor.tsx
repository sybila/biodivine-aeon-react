import { useEffect, useState } from 'react';
import ContentTab from '../../components/react-components/global/ContentTab/ContentTab';
import SideButtonMenu from '../../components/react-components/global/SideButtonMenu/SideButtonMenu';
import IconButtonReact from '../../components/react-components/lit-wrappers/IconButtonReact';
import ModelEditorCanvas from '../../components/react-components/model-editor/ModelEditorCanvas/ModelEditorCanvas';

import ControlIcon from '../../assets/icons/control-enabled.svg';
import PhenotypeIcon from '../../assets/icons/dna.svg';
import EyeIcon from '../../assets/icons/eye.svg';
import FileIcon from '../../assets/icons/file_copy-48px.svg';
import HelpIcon from '../../assets/icons/help.svg';
import ModelIcon from '../../assets/icons/model-48px.svg';
import PlayIcon from '../../assets/icons/play_circle_filled-48px.svg';
import TextEditorIcon from '../../assets/icons/writer.svg';

import KeepAlive from 'react-activation';
import HelpTabContent from '../../components/react-components/global/HelpTabContent/HelpTabContent';
import ControlEnabledEditorTabContent from '../../components/react-components/model-editor/ControlEnabledEditorTabContent/ControlEnabledEditorTabContent';
import ExportTabContent from '../../components/react-components/model-editor/ExportTabContent/ExportTabContent';
import FloatMenu from '../../components/react-components/model-editor/FloatMenu/FloatMenu';
import ImportExportTabContent from '../../components/react-components/model-editor/ImportExportTabContent/ImportExportTabContent';
import ModelEditorTabContent from '../../components/react-components/model-editor/ModelEditorTabContent/ModelEditorTabContent';
import PhenotypeEditorTabContent from '../../components/react-components/model-editor/PhenotypeEditorTabContent/PhenotypeEditorTabContent';
import StartCompTabContent from '../../components/react-components/model-editor/StartCompTabContent/StartCompTabContent';
import TextEditorTabContent from '../../components/react-components/model-editor/TextEditorTabContent/TextEditorTabContent';
import UtilitiesMenu from '../../components/react-components/model-editor/UtilitesMenu/UtilitiesMenu';
import VisualOptionsTabContent from '../../components/react-components/model-editor/VisualOptionsTabContent/VisualOptionsTabContent';
import type {
  MenuTabButton,
  MenuTabTypeME,
  MenuTabTypeMENotNull,
  ModelType,
} from '../../types/types';
import type { ModelEditorProps } from './ModelEditorProps';

const ModelEditor: React.FC<ModelEditorProps> = ({
  liveModelServ,
  modelVisualization,
  modelEditorServ,
  controlEnabledEditorServ,
  phenotypeEditorServ,
  textEditorServ,
  computationManagerServ,
  searchAndFilterHelpersServ,
  fileConvertorsServ,
  openCloseOperationsServ,
  warningServ,
  messageServ,
  loadingServ,
  shortcutManagerServ,
  pageStringProviderServ,

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
    if (isWitness) {
      return;
    }

    shortcutManagerServ?.setShortcuts('Model Editor');

    return () => {
      shortcutManagerServ?.clearShortcuts();
    };
  }, []);

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
            pageStringProviderServ={pageStringProviderServ}
            regulationsStore={regulationsStore}
            variablesStore={variablesStore}
            updateFunctionsStore={updateFunctionsStore}
            tabStore={tabStore}
            modelInfoStore={modelInfoStore}
            modelEditorStatusStore={modelEditorStatusStore}
            helpHoverStore={helpHoverStore}
          />
        );
      case 'Control-Enabled Editor':
        return (
          <ControlEnabledEditorTabContent
            controlEnabledEditorServ={controlEnabledEditorServ}
            searchAndFilterHelpersServ={searchAndFilterHelpersServ}
            pageStringProviderServ={pageStringProviderServ}
            loadingServ={loadingServ}
            controlStore={controlStore}
            variablesStore={variablesStore}
            modelEditorStatusStore={modelEditorStatusStore}
            helpHoverStore={helpHoverStore}
          />
        );
      case 'Phenotype Editor':
        return (
          <PhenotypeEditorTabContent
            phenotypeEditorServ={phenotypeEditorServ}
            searchAndFilterHelpersServ={searchAndFilterHelpersServ}
            pageStringProviderServ={pageStringProviderServ}
            loadingServ={loadingServ}
            controlStore={controlStore}
            variablesStore={variablesStore}
            modelEditorStatusStore={modelEditorStatusStore}
            helpHoverStore={helpHoverStore}
          />
        );
      case 'Text Editor':
        return (
          <TextEditorTabContent
            textEditorServ={textEditorServ}
            importLmServ={liveModelServ.Import}
            exportLmServ={liveModelServ.Export}
            messageServ={messageServ}
            pageStringProviderServ={pageStringProviderServ}
            helpHoverStore={helpHoverStore}
          />
        );
      case 'Visual Options':
        return (
          <VisualOptionsTabContent
            modelVisualization={modelVisualization}
            pageStringProviderServ={pageStringProviderServ}
            helpHoverStore={helpHoverStore}
          />
        );
      case 'Help':
        return (
          <HelpTabContent
            text={
              isWitness
                ? pageStringProviderServ.helpTextWitness()
                : pageStringProviderServ.helpTextModelEditor()
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

  const commonButtonProps = {
    buttonColor: 'var(--color-primary-buttons)',
    buttonHoverColor: 'var(--color-primary-buttons-hover)',
    buttonActiveColor: 'var(--color-primary-buttons-active)',
    tagTextColor: 'var(--color-primary-text)',
    showTag: true,
  };

  const sidePanelButtons: Array<{
    tab: MenuTabTypeMENotNull;
    icon: string;
    alt: string;
    hideFor?: string;
    fallback?: MenuTabTypeMENotNull;
  }> = [
    {
      tab: 'Start Computation',
      icon: PlayIcon,
      alt: 'Play',
      hideFor: 'witness' as const,
    },
    {
      tab: 'Import/Export',
      icon: FileIcon,
      alt: 'File',
      fallback: 'Export Witness',
    },
    { tab: 'Model Editor', icon: ModelIcon, alt: 'Model' },
    {
      tab: 'Control-Enabled Editor',
      icon: ControlIcon,
      alt: 'Control-Enabled',
    },
    { tab: 'Phenotype Editor', icon: PhenotypeIcon, alt: 'Phenotype' },
    {
      tab: 'Text Editor',
      icon: TextEditorIcon,
      alt: 'Text',
      hideFor: 'witness' as const,
    },
    { tab: 'Visual Options', icon: EyeIcon, alt: 'Visual' },
    { tab: 'Help', icon: HelpIcon, alt: 'Help' },
  ];

  const setTabRef = (tabName: MenuTabTypeMENotNull) => (el: any) =>
    modelEditorStatusStore
      .getState()
      .setMenuTabButtonRef(tabName, el as MenuTabButton);

  return (
    <>
      <UtilitiesMenu
        modelVisualization={modelVisualization}
        searchAndFilterHelpersServ={searchAndFilterHelpersServ}
        pageStringProviderServ={pageStringProviderServ}
        variablesStore={variablesStore}
        helpHoverStore={helpHoverStore}
        modelUndoRedoStore={modelUndoRedoStore}
        modelEditorStatusStore={modelEditorStatusStore}
      />

      <SideButtonMenu>
        {sidePanelButtons.map(({ tab, icon, alt, hideFor, fallback }) => {
          if (hideFor && modelType === hideFor) return null;
          const displayTab =
            fallback && modelType === 'witness' ? fallback : tab;
          return (
            <IconButtonReact
              key={displayTab}
              {...commonButtonProps}
              ref={setTabRef(displayTab)}
              isActive={activeTab === displayTab}
              onClick={() => showHideTab(displayTab)}
              iconSrc={icon}
              iconAlt={alt}
              tagText={displayTab}
            />
          );
        })}
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
