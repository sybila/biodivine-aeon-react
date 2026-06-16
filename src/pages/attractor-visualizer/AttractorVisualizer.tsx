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
import type { AttractorVisualizerProps } from './AttractorVisualizerProps';

type TabTypeAV = 'State Overview' | 'Witness Update Functions' | 'Help' | null;

const AttractorVisualizer: React.FC<AttractorVisualizerProps> = ({
  attractorVisualizerServ,
  messageServ,
  pageStringProviderServ,

  attractorVisualizerStatusStore,
}) => {
  const [activeTab, setActiveTab] = useState<TabTypeAV>(null);
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
        return (
          <HelpTabContent
            text={pageStringProviderServ.helpText()}
          />
        );
      default:
        return null;
    }
  };

  const showHideTab = (tabType: TabTypeAV) => {
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
          isActive={activeTab === 'State Overview'}
          onClick={() => showHideTab('State Overview')}
          iconSrc={StateIcon}
          iconAlt="State"
          showTag={true}
          tagText="State Overview"
        />
        <IconButtonReact
          isActive={activeTab === 'Witness Update Functions'}
          onClick={() => showHideTab('Witness Update Functions')}
          iconSrc={UpdateFunctionsIcon}
          iconAlt="Update Functions"
          showTag={true}
          tagText="Witness Update Functions"
        />
        <IconButtonReact
          isActive={activeTab === 'Help'}
          onClick={() => showHideTab('Help')}
          iconSrc={HelpIcon}
          iconAlt="Help"
          showTag={true}
          tagText="Help"
        />
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
