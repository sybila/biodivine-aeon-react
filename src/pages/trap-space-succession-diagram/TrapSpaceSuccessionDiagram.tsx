import { useEffect, useState } from 'react';
import ContentTab from '../../components/react-components/global/ContentTab/ContentTab';
import SideButtonMenu from '../../components/react-components/global/SideButtonMenu/SideButtonMenu';
import VisualizationCanvas from '../../components/react-components/global/VisualizationCanvas/VisualizationCanvas';
import type { MenuTabTypeTrapSpaceSD } from '../../types';
import ObjectProvider from '../../wiring/ObjectProvider';

const TrapSpaceSuccessionDiagram: React.FC = () => {
  /** Check if the succession diagram canvas is initialized. */
  const [initialized, setInitialized] = useState<boolean>(false);

  const activeTab: MenuTabTypeTrapSpaceSD = null;

  useEffect(() => {
    if (initialized) {
      ObjectProvider.TrapSpaceSuccessionDiagramnServicesProvider.trapSpaceSDServ.openSuccessionDiagram();
    }
  }, [initialized]);

  const renderTabContent = () => {
    switch (activeTab) {
      default:
        return null;
    }
  };

  const showHideTab = (tabType: MenuTabTypeTrapSpaceSD) => {
    // if (activeTab === tabType) {
    //   bifurcationExplorerStatusStore.getState().setActiveMenuTab(null);
    //   return;
    // }
    // bifurcationExplorerStatusStore.getState().setActiveMenuTab(tabType);
  };

  return (
    <>
      <SideButtonMenu>
        {/* TODO - add buttons when menus created */}
        {/* <IconButtonReact
          isActive={activeTab === 'Overview'}
          onClick={() => showHideTab('Overview')}
          iconSrc={StateIcon}
          iconAlt="State"
          showTag={true}
          tagText="Overview"
        ></IconButtonReact> */}
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
          ObjectProvider.TrapSpaceSuccessionDiagramnServicesProvider.trapSpaceSDServ.init(
            container
          );
        }}
      />
    </>
  );
};

export default TrapSpaceSuccessionDiagram;
