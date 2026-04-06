import { useEffect, useState } from 'react';
import ContentTab from '../../components/react-components/global/ContentTab/ContentTab';
import SideButtonMenu from '../../components/react-components/global/SideButtonMenu/SideButtonMenu';
import VisualizationCanvas from '../../components/react-components/global/VisualizationCanvas/VisualizationCanvas';
import type { MenuTabTypeTrapSpaceSD, NodeDataTSSD } from '../../types';
import ObjectProvider from '../../wiring/ObjectProvider';

// TODO - remove, this is only for testing purposes
const mockNodeList: NodeDataTSSD[] = [
  {
    id: 0,
    variableValues: {
      A: undefined,
      B: undefined,
      C: undefined,
    },
    cardinality: 8,
    childNodeIds: [1, 2, 4],
    type: 'decision',
  },
  {
    id: 1,
    variableValues: {
      A: 0,
      B: undefined,
      C: undefined,
    },
    cardinality: 4,
    childNodeIds: [3],
    type: 'decision',
  },
  {
    id: 2,
    variableValues: {
      A: 1,
      B: undefined,
      C: undefined,
    },
    cardinality: 4,
    childNodeIds: [],
    type: 'leaf',
  },
  {
    id: 3,
    variableValues: {
      A: 0,
      B: 0,
      C: undefined,
    },
    cardinality: 2,
    childNodeIds: [],
    type: 'leaf',
  },
  {
    id: 4,
    variableValues: {
      A: 0,
      B: 1,
      C: undefined,
    },
    cardinality: 2,
    childNodeIds: [],
    type: 'leaf',
  },
];

const TrapSpaceSuccessionDiagram: React.FC = () => {
  /** Check if the BifurcationExplorerCanvas is initialized. */
  const [initialized, setInitialized] = useState<boolean>(false);

  const activeTab: MenuTabTypeTrapSpaceSD = null;

  useEffect(() => {
    if (initialized) {
      // TODO - replace mockNodeList with actual API response when available.
      ObjectProvider.TrapSpaceSuccessionDiagramnServicesProvider.trapSpaceSDServ.insertSuccessionDiagram(
        mockNodeList,
        true,
        true,
        true
      );
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
