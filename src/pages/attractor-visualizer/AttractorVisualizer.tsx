import { useEffect, useState } from 'react';
import KeepAlive from 'react-activation';
import AttractorVisCanvas from '../../components/react-components/attractor-visualizer/AttractorVisCanvas/AttractorVisCanvas';
import StateOverviewTabContent from '../../components/react-components/attractor-visualizer/StateOverviewTabContent/StateOverviewTabContent';
import WitnessUpdateFunctionsTabContent from '../../components/react-components/attractor-visualizer/WitnessUpdateFunctionsTabContent/WitnessUpdateFunctionsTabContent';
import ContentTab from '../../components/react-components/global/ContentTab/ContentTab';
import SideButtonMenu from '../../components/react-components/global/SideButtonMenu/SideButtonMenu';
import IconButtonReact from '../../components/react-components/lit-wrappers/IconButtonReact';

import HelpIcon from '../../assets/icons/help.svg';
import StateIcon from '../../assets/icons/state_overview.svg';
import UpdateFunctionsIcon from '../../assets/icons/update_functions.svg';

import HelpTabContent from '../../components/react-components/global/HelpTabContent/HelpTabContent';
import type {
  MenuTabTypeAV,
  MenuTabTypeAVNotNull,
} from '../../types/pages/attractorVisualizer';
import type { MenuTabButton } from '../../types/types';
import type { AttractorVisualizerProps } from './AttractorVisualizerProps';

const AttractorVisualizer: React.FC<AttractorVisualizerProps> = ({
  attractorVisualizerServ,
  messageServ,
  pageStringProviderServ,
  shortcutManagerServ,

  attractorVisualizerStatusStore,
}) => {
  const [activeTab, setActiveTab] = useState<MenuTabTypeAV>(null);
  const [overviewAutoOpened, setOverviewAutoOpened] = useState(false);

  const selectedNodeState = attractorVisualizerStatusStore(
    (state) => state.selectedNodeState
  );

  useEffect(() => {
    if (selectedNodeState != null && !overviewAutoOpened) {
      setActiveTab('State Overview');
      setOverviewAutoOpened(true);
    } else if (selectedNodeState == null) {
      setOverviewAutoOpened(false);
    }
  }, [selectedNodeState]);

  useEffect(() => {
    shortcutManagerServ?.setShortcuts('Attractor Visualizer');

    return () => {
      shortcutManagerServ?.clearShortcuts();
    };
  }, []);

  const commonButtonProps = {
    buttonColor: 'var(--color-primary-buttons)',
    buttonHoverColor: 'var(--color-primary-buttons-hover)',
    buttonActiveColor: 'var(--color-primary-buttons-active)',
    tagTextColor: 'var(--color-primary-text)',
    showTag: true,
  };

  const sidePanelButtons: Array<{
    tab: MenuTabTypeAVNotNull;
    icon: string;
    alt: string;
  }> = [
    { tab: 'State Overview', icon: StateIcon, alt: 'State' },
    {
      tab: 'Witness Update Functions',
      icon: UpdateFunctionsIcon,
      alt: 'Update Functions',
    },
    { tab: 'Help', icon: HelpIcon, alt: 'Help' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'State Overview':
        return (
          <StateOverviewTabContent
            attractorVisualizerServ={attractorVisualizerServ}
            attractorVisualizerStatusStore={attractorVisualizerStatusStore}
            messageServ={messageServ}
          />
        );
      case 'Witness Update Functions':
        return (
          <WitnessUpdateFunctionsTabContent
            attractorVisualizerServ={attractorVisualizerServ}
          />
        );
      case 'Help':
        return <HelpTabContent text={pageStringProviderServ.helpText()} />;
      default:
        return null;
    }
  };

  const showHideTab = (tabType: MenuTabTypeAV) => {
    if (activeTab === tabType) {
      setActiveTab(null);
      return;
    }

    setActiveTab(tabType);
  };

  const setTabRef = (tabName: MenuTabTypeAVNotNull) => (el: any) =>
    attractorVisualizerStatusStore
      .getState()
      .setMenuTabButtonRef(tabName, el as MenuTabButton);

  return (
    <>
      <SideButtonMenu>
        {sidePanelButtons.map(({ tab, icon, alt }) => {
          return (
            <IconButtonReact
              key={tab}
              {...commonButtonProps}
              ref={setTabRef(tab)}
              isActive={activeTab === tab}
              onClick={() => showHideTab(tab)}
              iconSrc={icon}
              iconAlt={alt}
              tagText={tab}
            />
          );
        })}
      </SideButtonMenu>

      <ContentTab
        showTab={activeTab !== null}
        onClose={() => showHideTab(null)}
        headerText={activeTab ?? ''}
      >
        {renderTabContent()}
      </ContentTab>

      <KeepAlive>
        <AttractorVisCanvas attractorVisualizerServ={attractorVisualizerServ} />
      </KeepAlive>
    </>
  );
};

export default AttractorVisualizer;
