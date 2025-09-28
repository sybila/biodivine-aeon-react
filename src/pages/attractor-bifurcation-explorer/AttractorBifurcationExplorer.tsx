import { useState } from 'react';
import SideButtonMenu from '../../components/react-components/global/SideButtonMenu/SideButtonMenu';
import IconButtonReact from '../../components/react-components/lit-wrappers/IconButtonReact';
import ContentTab from '../../components/react-components/global/ContentTab/ContentTab';
import KeepAlive from 'react-activation';
import OverviewTabContent from '../../components/react-components/attractor-bifurcation-explorer/OverviewTabContent/OverviewTabContent';
import BifurcationExplorerCanvas from '../../components/react-components/attractor-bifurcation-explorer/BifurcationExplorerCanvas/BifurcationExplorerCanvas';
import MakeDecisionTabContent from '../../components/react-components/attractor-bifurcation-explorer/MakeDecisionTabContent/MakeDecisionTabContent';
import StabilityAnalysisTabContent from '../../components/react-components/attractor-bifurcation-explorer/StabilityAnalysisTabContent/StabilityAnalysisTabContent';
import VisualOptionsTabContent from '../../components/react-components/attractor-bifurcation-explorer/VisualOptionsTabContent/VisualOptionsTabContent';
import AttractorBifurcationExplorerServices from '../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorer';

import StateIcon from '../../assets/icons/state_overview.svg';
import StabilityIcon from '../../assets/icons/stability_analysis.svg';
import DecisionIcon from '../../assets/icons/make_decision.svg';
import EyeIcon from '../../assets/icons/eye.svg';

type TabTypeME =
  | 'Overview'
  | 'Stability Analysis'
  | 'Make Decision'
  | 'Visual Options'
  | null;

const AttractorBifurcationExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabTypeME>(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTabContent />;
      case 'Stability Analysis':
        return <StabilityAnalysisTabContent />;
      case 'Make Decision':
        return <MakeDecisionTabContent />;
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

  AttractorBifurcationExplorerServices.openBifurcationTree();

  return (
    <>
      <SideButtonMenu>
        <IconButtonReact
          isActive={activeTab === 'Overview'}
          onClick={() => showHideTab('Overview')}
          iconSrc={StateIcon}
          iconAlt="State"
          showTag={true}
          tagText="Overview"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === 'Stability Analysis'}
          onClick={() => showHideTab('Stability Analysis')}
          iconSrc={StabilityIcon}
          iconAlt="Stability"
          showTag={true}
          tagText="Stability Analysis"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === 'Make Decision'}
          onClick={() => showHideTab('Make Decision')}
          iconSrc={DecisionIcon}
          iconAlt="Decision"
          iconSize="88%"
          showTag={true}
          tagText="Make Decision"
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

      <KeepAlive>
        <BifurcationExplorerCanvas />
      </KeepAlive>
    </>
  );
};

export default AttractorBifurcationExplorer;
