import KeepAlive from 'react-activation';
import AttractorVisCanvas from '../../components/react-components/attractor-visualizer/AttractorVisCanvas/AttractorVisCanvas';
import ContentTab from '../../components/react-components/global/ContentTab/ContentTab';
import SideButtonMenu from '../../components/react-components/global/SideButtonMenu/SideButtonMenu';
import IconButtonReact from '../../components/react-components/lit-wrappers/IconButtonReact';
import { useState } from 'react';
import StateOverviewTabContent from '../../components/react-components/attractor-visualizer/StateOverviewTabContent/StateOverviewTabContent';

type TabTypeAV = 'State Overview' | null;

const AttractorVisualizer = () => {
  const [activeTab, setActiveTab] = useState<TabTypeAV>(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'State Overview':
        return <StateOverviewTabContent />;
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
          iconAlt="Play"
          showTag={true}
          tagText="State Overview"
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
