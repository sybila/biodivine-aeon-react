import ContentTab from '../../components/react-components/global/ContentTab/ContentTab';
import IconButtonReact from '../../components/react-components/lit-wrappers/IconButtonReact';
import { useState } from 'react';

import OverviewIcon from '../../assets/icons/overview.svg';
import FilterIcon from '../../assets/icons/filter.svg';
import SortingIcon from '../../assets/icons/sorting.svg';
import PagesIcon from '../../assets/icons/pages.svg';

import PerturbationTable from '../../components/react-components/control-perturbations-table/PerturbationTable/PerturbationTable';
import TopButtonMenu from '../../components/react-components/global/TopButtonMenu/TopButtonMenu';
import OverviewTabContent from '../../components/react-components/control-perturbations-table/OverviewTabContent/OverviewTabContent';
import FilterTabContent from '../../components/react-components/control-perturbations-table/FilterTabContent/FilterTabContent';
import PagesTabContent from '../../components/react-components/control-perturbations-table/PagesTabContent/PagesTabContent';
import SortTabContent from '../../components/react-components/control-perturbations-table/SortTabContent/SortTabContent';

type TabTypeCPT = 'Overview' | 'Filters' | 'Sorting' | 'Pages' | null;

const ControlPerturbationsTable = () => {
  const [activeTab, setActiveTab] = useState<TabTypeCPT>(null);

  /** Trigger which is used to start filtering of perturbations. */
  const [startFilter, setStartFilter] = useState<boolean>(true);
  /** Trigger which is used to start sorting of perturbations. */
  const [startSort, setStartSort] = useState<boolean>(true);

  const [nextPageExists, setNextPageExists] = useState<boolean>(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTabContent />;
      case 'Filters':
        return (
          <FilterTabContent
            setStartFilter={setStartFilter}
            startFilter={startFilter}
          />
        );
      case 'Sorting':
        return (
          <SortTabContent startSort={startSort} setStartSort={setStartSort} />
        );
      case 'Pages':
        return (
          <PagesTabContent
            setStartFilter={setStartFilter}
            startFilter={startFilter}
            nextPageExists={nextPageExists}
          />
        );
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
        <div className="z-3 overflow-visible max-w-[67px] max-h-67px">
          <IconButtonReact
            isActive={activeTab === 'Overview'}
            onClick={() => showHideTab('Overview')}
            iconSrc={OverviewIcon}
            iconAlt="Overview"
            showTag={true}
            tagText="Overview"
          />
        </div>

        <div className="z-2 overflow-visible max-w-[67px] max-h-67px">
          <IconButtonReact
            isActive={activeTab === 'Filters'}
            onClick={() => showHideTab('Filters')}
            iconSrc={FilterIcon}
            iconAlt="Filters"
            showTag={true}
            tagText="Filters"
          />
        </div>

        <div className="z-1 overflow-visible max-w-[67px] max-h-67px">
          <IconButtonReact
            isActive={activeTab === 'Sorting'}
            onClick={() => showHideTab('Sorting')}
            iconSrc={SortingIcon}
            iconAlt="Sorting"
            showTag={true}
            tagText="Sorting"
          />
        </div>

        <IconButtonReact
          isActive={activeTab === 'Pages'}
          onClick={() => showHideTab('Pages')}
          iconSrc={PagesIcon}
          iconAlt="Pages"
          showTag={true}
          tagText="Pages"
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
        <PerturbationTable
          startFilter={startFilter}
          startSort={startSort}
          setNextPageExists={setNextPageExists}
        />
      </div>
    </>
  );
};

export default ControlPerturbationsTable;
