import { useEffect, useState } from 'react';
import ContentTab from '../../components/react-components/global/ContentTab/ContentTab';
import SideButtonMenu from '../../components/react-components/global/SideButtonMenu/SideButtonMenu';
import VisualizationCanvas from '../../components/react-components/global/VisualizationCanvas/VisualizationCanvas';
import IconButtonReact from '../../components/react-components/lit-wrappers/IconButtonReact';
import type {
  MenuTabButton,
  MenuTabTypeTrapSpaceSD,
  MenuTabTypeTrapSpaceSDNotNull,
} from '../../types/types';
import type { TrapSpaceSuccessionDiagramProps } from './TrapSpaceSuccessionDiagramProps';

// TODO = change, might be confusing, that its the same icon as attr vis
import AttractorIcon from '../../assets/icons/attractor-visualizer.svg';
import EyeIcon from '../../assets/icons/eye.svg';
import HelpIcon from '../../assets/icons/help.svg';
import DecisionIcon from '../../assets/icons/make_decision.svg';
import StateIcon from '../../assets/icons/state_overview.svg';

import HelpTabContent from '../../components/react-components/global/HelpTabContent/HelpTabContent';
import MakeDecisionTabContent from '../../components/react-components/trap-space-succession-diagram/MakeDecisionTabContent/MakeDecisionTabContent';
import OverviewTabContent from '../../components/react-components/trap-space-succession-diagram/OverviewTabContent/OverviewTabContent';

const TrapSpaceSuccessionDiagram: React.FC<TrapSpaceSuccessionDiagramProps> = ({
  trapSpaceSDServ,
  pageStringProviderServ,

  trapSpaceSDStatusStore,
  helpHoverStore,
}) => {
  /** Check if the succession diagram canvas is initialized. */
  const [initialized, setInitialized] = useState<boolean>(false);

  const activeTab: MenuTabTypeTrapSpaceSD = trapSpaceSDStatusStore(
    (state) => state.activeMenuTab
  );

  useEffect(() => {
    if (initialized) {
      trapSpaceSDServ.openSuccessionDiagram();
    }
  }, [initialized]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <OverviewTabContent
            generalStringsServ={pageStringProviderServ.OtherStrings.OverviewTab}
            trapSpaceSDStatusStore={trapSpaceSDStatusStore}
          />
        );
      case 'Make Decision':
        return (
          <MakeDecisionTabContent
            trapSpaceSDServ={trapSpaceSDServ}
            generalStringsServ={
              pageStringProviderServ.OtherStrings.MakeDecisionTab
            }
            tooltipStringsServ={pageStringProviderServ.Tooltips.MakeDecisionTab}
            trapSpaceSDStatusStore={trapSpaceSDStatusStore}
            helpHoverStore={helpHoverStore}
          />
        );
      case 'Attractor Classes':
        return null;
      case 'Visual Options':
        return null;
      case 'Help':
        return <HelpTabContent text={pageStringProviderServ.helpText()} />;
      default:
        return null;
    }
  };

  const showHideTab = (tabType: MenuTabTypeTrapSpaceSD) => {
    if (activeTab === tabType) {
      trapSpaceSDStatusStore.getState().setActiveMenuTab(null);
      return;
    }
    trapSpaceSDStatusStore.getState().setActiveMenuTab(tabType);
  };

  const setTabRef = (
    tabName: MenuTabTypeTrapSpaceSDNotNull,
    el: MenuTabButton
  ) => trapSpaceSDStatusStore.getState().setMenuTabButtonRef(tabName, el);

  const commonButtonProps = {
    buttonColor: 'var(--color-primary-buttons)',
    buttonHoverColor: 'var(--color-primary-buttons-hover)',
    buttonActiveColor: 'var(--color-primary-buttons-active)',
    tagTextColor: 'var(--color-primary-text)',
    showTag: true,
    iconSize: '45px',
  };

  const sidePanelButtons: Array<{
    tab: MenuTabTypeTrapSpaceSDNotNull;
    icon: string;
    alt: string;
  }> = [
    {
      tab: 'Overview',
      icon: StateIcon,
      alt: 'State',
    },
    {
      tab: 'Make Decision',
      icon: DecisionIcon,
      alt: 'Decision',
    },
    {
      tab: 'Attractor Classes',
      icon: AttractorIcon,
      alt: 'Attractor',
    },
    { tab: 'Visual Options', icon: EyeIcon, alt: 'Visual' },
    {
      tab: 'Help',
      icon: HelpIcon,
      alt: 'Help',
    },
  ];

  return (
    <>
      <SideButtonMenu>
        {sidePanelButtons.map(({ tab, icon, alt }) => {
          return (
            <IconButtonReact
              key={tab}
              {...commonButtonProps}
              ref={(el) => setTabRef(tab, el as MenuTabButton)}
              isActive={activeTab === tab}
              onClick={() => showHideTab(tab)}
              iconSrc={icon}
              iconAlt={alt}
              tagText={tab ?? ''}
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

      <VisualizationCanvas
        initialized={initialized}
        setInitialized={(initialized: boolean) => setInitialized(initialized)}
        initializeCanvas={(container) => {
          trapSpaceSDServ.init(container);
        }}
      />
    </>
  );
};

export default TrapSpaceSuccessionDiagram;
