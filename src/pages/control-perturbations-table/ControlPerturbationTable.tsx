import ContentTab from '../../components/react-components/global/ContentTab/ContentTab';
import IconButtonReact from '../../components/react-components/lit-wrappers/IconButtonReact';
import { useState } from 'react';

import StateIcon from '../../assets/icons/state_overview.svg';
import UpdateFuncitons from '../../assets/icons/update_functions.svg';
import PerturbationTable from '../../components/react-components/control-perturbations-table/PerturbationTable/PerturbationTable';
import TopButtonMenu from '../../components/react-components/global/TopButtonMenu/TopButtonMenu';
import OverviewTabContent from '../../components/react-components/control-perturbations-table/OverviewTabContent/OverviewTabContent';
import FilterTabContent from '../../components/react-components/control-perturbations-table/FilterTabContent/FilterTabContent';

type TabTypeCPT = 'Overview' | 'Filters and Sorting' | null;

const ControlPerturbationsTable = () => {
  const [activeTab, setActiveTab] = useState<TabTypeCPT>(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTabContent />;
      case 'Filters and Sorting':
        return <FilterTabContent />;
      default:
        return null;
    }
  };

  const showHideTab = (tabType: TabTypeCPT) => {
    if (activeTab === tabType) {
      setActiveTab(null);
      return;
    }

    setActiveTab(tabType);
  };

  return (
    <>
      <TopButtonMenu>
        <div className="z-11 overflow-visible max-w-[67px] max-h-67px">
          <IconButtonReact
            isActive={activeTab === 'Overview'}
            onClick={() => showHideTab('Overview')}
            iconSrc={StateIcon}
            iconAlt="State"
            showTag={true}
            tagText="Overview"
          />
        </div>

        <IconButtonReact
          isActive={activeTab === 'Filters and Sorting'}
          onClick={() => showHideTab('Filters and Sorting')}
          iconSrc={UpdateFuncitons}
          iconAlt="Update Functions"
          showTag={true}
          tagText="Filters and Sorting"
        />
      </TopButtonMenu>

      <ContentTab
        showTab={activeTab !== null}
        onClose={() => showHideTab(null)}
        headerText={activeTab ?? ''}
        spaceOnTop={true}
      >
        {renderTabContent()}
      </ContentTab>

      <div className="flex justify-center-safe h-[calc(100vh-68px)] w-screen z-0 absolute top-[68px] left-0">
        <PerturbationTable />
      </div>
    </>
  );
};

export default ControlPerturbationsTable;
