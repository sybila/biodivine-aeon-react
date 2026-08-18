import { useEffect, useRef, useState } from 'react';
import BifurcationExplorerCanvas from '../../components/react-components/attractor-bifurcation-explorer/BifurcationExplorerCanvas/BifurcationExplorerCanvas';
import MakeDecisionTabContent from '../../components/react-components/attractor-bifurcation-explorer/MakeDecisionTabContent/MakeDecisionTabContent';
import OverviewTabContent from '../../components/react-components/attractor-bifurcation-explorer/OverviewTabContent/OverviewTabContent';
import StabilityAnalysisTabContent from '../../components/react-components/attractor-bifurcation-explorer/StabilityAnalysisTabContent/StabilityAnalysisTabContent';
import VisualOptionsTabContent from '../../components/react-components/attractor-bifurcation-explorer/VisualOptionsTabContent/VisualOptionsTabContent';
import ContentTab from '../../components/react-components/global/ContentTab/ContentTab';
import SideButtonMenu from '../../components/react-components/global/SideButtonMenu/SideButtonMenu';
import IconButtonReact from '../../components/react-components/lit-wrappers/IconButtonReact';

import EyeIcon from '../../assets/icons/eye.svg';
import HelpIcon from '../../assets/icons/help.svg';
import DecisionIcon from '../../assets/icons/make_decision.svg';
import StabilityIcon from '../../assets/icons/stability_analysis.svg';
import StateIcon from '../../assets/icons/state_overview.svg';

import UtilitiesMenu from '../../components/react-components/attractor-bifurcation-explorer/UtilitiesMenu/UtilitiesMenu';
import HelpTabContent from '../../components/react-components/global/HelpTabContent/HelpTabContent';
import type { DecisionMixedNode, LeafNode, MenuTabTypeABE } from '../../types/types';
import type { AttractorBifurcationExplorerProps } from './AttractorBifurcationExplorerProps';

const AttractorBifurcationExplorer: React.FC<
  AttractorBifurcationExplorerProps
> = ({
  attractorBifurcationExplorerServ,
  behaviorClassOperationsServ,
  pageStringProviderServ,
  shortcutManagerServ,

  bifurcationExplorerStatusStore,
  helpHoverStore,
}) => {
  /** Check if the BifurcationExplorerCanvas is initialized. */
  const [initialized, setInitialized] = useState<boolean>(false);

  const prevSelectedNodeRef = useRef<LeafNode | DecisionMixedNode | null>(null);

  const activeTab: MenuTabTypeABE = bifurcationExplorerStatusStore(
    (state) => state.activeMenuTab
  );

  const selectedNode = bifurcationExplorerStatusStore(
    (state) => state.selectedNode
  );

  useEffect(() => {
    const prev = prevSelectedNodeRef.current;
    const justSelectedNode = selectedNode != null && prev == null;

    const noTabOpen = !activeTab;

    if (justSelectedNode && noTabOpen) {
      bifurcationExplorerStatusStore.getState().setActiveMenuTab('Overview');
    }

    prevSelectedNodeRef.current = selectedNode;
  }, [selectedNode, activeTab]);

  useEffect(() => {
    shortcutManagerServ?.setShortcuts('Attractor Bifurcation Explorer');

    return () => {
      shortcutManagerServ?.clearShortcuts();
    };
  }, []);

  useEffect(() => {
    if (initialized) {
      attractorBifurcationExplorerServ.openBifurcationTree();
    }
  }, [initialized]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <OverviewTabContent
            attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
            behaviorClassOperationsServ={behaviorClassOperationsServ}
            pageStringProviderServ={pageStringProviderServ}
            bifurcationExplorerStatusStore={bifurcationExplorerStatusStore}
            helpHoverStore={helpHoverStore}
          />
        );
      case 'Stability Analysis':
        return (
          <StabilityAnalysisTabContent
            attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
            pageStringProviderServ={pageStringProviderServ}
            bifurcationExplorerStatusStore={bifurcationExplorerStatusStore}
            helpHoverStore={helpHoverStore}
          />
        );
      case 'Make Decision':
        return (
          <MakeDecisionTabContent
            attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
            behaviorClassOperationsServ={behaviorClassOperationsServ}
            pageStringProviderServ={pageStringProviderServ}
            bifurcationExplorerStatusStore={bifurcationExplorerStatusStore}
            helpHoverStore={helpHoverStore}
          />
        );
      case 'Visual Options':
        return (
          <VisualOptionsTabContent
            attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
            pageStringProviderServ={pageStringProviderServ}
            helpHoverStore={helpHoverStore}
          />
        );
      case 'Help':
        return <HelpTabContent text={pageStringProviderServ.helpText()} />;
      default:
        return null;
    }
  };

  const showHideTab = (tabType: MenuTabTypeABE) => {
    if (activeTab === tabType) {
      bifurcationExplorerStatusStore.getState().setActiveMenuTab(null);
      return;
    }

    bifurcationExplorerStatusStore.getState().setActiveMenuTab(tabType);
  };

  return (
    <>
      <UtilitiesMenu
        attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
        pageStringProviderServ={pageStringProviderServ}
        helpHoverStore={helpHoverStore}
        bifurcationExplorerStatusStore={bifurcationExplorerStatusStore}
      />

      <SideButtonMenu>
        <IconButtonReact
          isActive={activeTab === 'Overview'}
          onClick={() => showHideTab('Overview')}
          buttonColor="var(--color-primary-buttons)"
          buttonHoverColor="var(--color-primary-buttons-hover)"
          buttonActiveColor="var(--color-primary-buttons-active)"
          tagTextColor="var(--color-primary-text)"
          iconSrc={StateIcon}
          iconAlt="State"
          showTag={true}
          tagText="Overview"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === 'Stability Analysis'}
          onClick={() => showHideTab('Stability Analysis')}
          buttonColor="var(--color-primary-buttons)"
          buttonHoverColor="var(--color-primary-buttons-hover)"
          buttonActiveColor="var(--color-primary-buttons-active)"
          tagTextColor="var(--color-primary-text)"
          iconSrc={StabilityIcon}
          iconAlt="Stability"
          showTag={true}
          tagText="Stability Analysis"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === 'Make Decision'}
          onClick={() => showHideTab('Make Decision')}
          buttonColor="var(--color-primary-buttons)"
          buttonHoverColor="var(--color-primary-buttons-hover)"
          buttonActiveColor="var(--color-primary-buttons-active)"
          tagTextColor="var(--color-primary-text)"
          iconSrc={DecisionIcon}
          iconAlt="Decision"
          iconSize="88%"
          showTag={true}
          tagText="Make Decision"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === 'Visual Options'}
          onClick={() => showHideTab('Visual Options')}
          buttonColor="var(--color-primary-buttons)"
          buttonHoverColor="var(--color-primary-buttons-hover)"
          buttonActiveColor="var(--color-primary-buttons-active)"
          tagTextColor="var(--color-primary-text)"
          iconSrc={EyeIcon}
          iconAlt="Visual"
          showTag={true}
          tagText="Visual Options"
        ></IconButtonReact>
        <IconButtonReact
          isActive={activeTab === 'Help'}
          onClick={() => showHideTab('Help')}
          buttonColor="var(--color-primary-buttons)"
          buttonHoverColor="var(--color-primary-buttons-hover)"
          buttonActiveColor="var(--color-primary-buttons-active)"
          tagTextColor="var(--color-primary-text)"
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

      <BifurcationExplorerCanvas
        initialized={initialized}
        setInitialized={setInitialized}
        attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
      />
    </>
  );
};

export default AttractorBifurcationExplorer;
