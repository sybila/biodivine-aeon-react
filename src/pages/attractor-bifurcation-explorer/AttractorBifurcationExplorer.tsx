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
import type {
  DecisionMixedNode,
  LeafNode,
  MenuTabButton,
  MenuTabTypeABE,
  MenuTabTypeABENotNull,
} from '../../types/types';
import type { AttractorBifurcationExplorerProps } from './AttractorBifurcationExplorerProps';

const AttractorBifurcationExplorer: React.FC<
  AttractorBifurcationExplorerProps
> = ({
  attractorBifurcationExplorerServ,
  behaviorClassOperationsServ,
  pageStringProviderServ,
  messageServ,
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

  const commonButtonProps = {
    buttonColor: 'var(--color-primary-buttons)',
    buttonHoverColor: 'var(--color-primary-buttons-hover)',
    buttonActiveColor: 'var(--color-primary-buttons-active)',
    tagTextColor: 'var(--color-primary-text)',
    showTag: true,
  };

  const sidePanelButtons: Array<{
    tab: MenuTabTypeABENotNull;
    icon: string;
    alt: string;
  }> = [
    { tab: 'Overview', icon: StateIcon, alt: 'State' },
    { tab: 'Stability Analysis', icon: StabilityIcon, alt: 'Stability' },
    {
      tab: 'Make Decision',
      icon: DecisionIcon,
      alt: 'Decision',
    },
    { tab: 'Visual Options', icon: EyeIcon, alt: 'Visual' },
    { tab: 'Help', icon: HelpIcon, alt: 'Help' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <OverviewTabContent
            attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
            behaviorClassOperationsServ={behaviorClassOperationsServ}
            messageServ={messageServ}
            pageStringProviderServ={pageStringProviderServ}
            bifurcationExplorerStatusStore={bifurcationExplorerStatusStore}
            helpHoverStore={helpHoverStore}
          />
        );
      case 'Stability Analysis':
        return (
          <StabilityAnalysisTabContent
            attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
            messageServ={messageServ}
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
            messageServ={messageServ}
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

  const setTabRef = (tabName: MenuTabTypeABENotNull) => (el: any) =>
    bifurcationExplorerStatusStore
      .getState()
      .setMenuTabButtonRef(tabName, el as MenuTabButton);

  return (
    <>
      <UtilitiesMenu
        attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
        pageStringProviderServ={pageStringProviderServ}
        helpHoverStore={helpHoverStore}
        bifurcationExplorerStatusStore={bifurcationExplorerStatusStore}
      />

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

      <BifurcationExplorerCanvas
        initialized={initialized}
        setInitialized={setInitialized}
        attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
      />
    </>
  );
};

export default AttractorBifurcationExplorer;
