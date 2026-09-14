import { useEffect, useState } from 'react';
import ContentTab from '../../components/react-components/global/ContentTab/ContentTab';
import SideButtonMenu from '../../components/react-components/global/SideButtonMenu/SideButtonMenu';
import VisualizationCanvas from '../../components/react-components/global/VisualizationCanvas/VisualizationCanvas';
import IconButtonReact from '../../components/react-components/lit-wrappers/IconButtonReact';
import type { MenuTabTypeTrapSpaceSD } from '../../types/types';
import type { TrapSpaceSuccessionDiagramProps } from './TrapSpaceSuccessionDiagramProps';

import StateIcon from '../../assets/icons/state_overview.svg';
import OverviewTabContent from '../../components/react-components/trap-space-succession-diagram/OverviewTabContent/OverviewTabContent';

const TrapSpaceSuccessionDiagram: React.FC<TrapSpaceSuccessionDiagramProps> = ({
  trapSpaceSDServ,

  trapSpaceSDStatusStore,
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
          <OverviewTabContent trapSpaceSDStatusStore={trapSpaceSDStatusStore} />
        );
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
