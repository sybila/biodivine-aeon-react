import KeepAlive from 'react-activation';
import AttractorVisCanvas from '../../components/react-components/attractor-visualizer/AttractorVisCanvas/AttractorVisCanvas';
import ContentTab from '../../components/react-components/global/ContentTab/ContentTab';
import SideButtonMenu from '../../components/react-components/global/SideButtonMenu/SideButtonMenu';
import IconButtonReact from '../../components/react-components/lit-wrappers/IconButtonReact';
import { useState } from 'react';
import StateOverviewTabContent from '../../components/react-components/attractor-visualizer/StateOverviewTabContent/StateOverviewTabContent';
import WittnessUpdateFunctionsTabContent from '../../components/react-components/attractor-visualizer/WittnessUpdateFunctionsTabContent/WittnessUpdateFunctionsTabContent';

import StateIcon from '../../assets/icons/state_overview.svg';
import UpdateFuncitons from '../../assets/icons/update_functions.svg';

type TabTypeAV = 'State Overview' | 'Wittness Update Functions' | null;

const AttractorVisualizer = () => {
  const [activeTab, setActiveTab] = useState<TabTypeAV>(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'State Overview':
        return <StateOverviewTabContent />;
      case 'Wittness Update Functions':
        return <WittnessUpdateFunctionsTabContent />;
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
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === 'Wittness Update Functions'}
          onClick={() => showHideTab('Wittness Update Functions')}
          iconSrc={UpdateFuncitons}
          iconAlt="Update Functions"
          showTag={true}
          tagText="Wittness Update Functions"
        ></IconButtonReact>
      </SideButtonMenu>

      <ContentTab
        showTab={activeTab !== null}
        onClose={() => showHideTab(null)}
        headerText={activeTab ?? ''}
      >
        {renderTabContent()}
      </ContentTab>

      <KeepAlive>
        <AttractorVisCanvas />
      </KeepAlive>
    </>
  );
};

export default AttractorVisualizer;
