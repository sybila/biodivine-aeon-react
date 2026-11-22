import { useEffect, useState } from 'react';
import ContentTab from '../../components/react-components/global/ContentTab/ContentTab';
import IconButtonReact from '../../components/react-components/lit-wrappers/IconButtonReact';

import FilterIcon from '../../assets/icons/filter.svg';
import HelpIcon from '../../assets/icons/help.svg';
import OverviewIcon from '../../assets/icons/overview.svg';
import PagesIcon from '../../assets/icons/pages.svg';
import SortingIcon from '../../assets/icons/sorting.svg';

import FilterTabContent from '../../components/react-components/control-perturbations-table/FilterTabContent/FilterTabContent';
import OverviewTabContent from '../../components/react-components/control-perturbations-table/OverviewTabContent/OverviewTabContent';
import PagesTabContent from '../../components/react-components/control-perturbations-table/PagesTabContent/PagesTabContent';
import PerturbationTable from '../../components/react-components/control-perturbations-table/PerturbationTable/PerturbationTable';
import SortTabContent from '../../components/react-components/control-perturbations-table/SortTabContent/SortTabContent';
import HelpTabContent from '../../components/react-components/global/HelpTabContent/HelpTabContent';
import TopButtonMenu from '../../components/react-components/global/TopButtonMenu/TopButtonMenu';
import type {
  MenuTabTypeCPT,
  MenuTabTypeCPTNotNull,
} from '../../types/pages/controlPerturbationTable';
import type { MenuTabButton } from '../../types/types';
import type { ControlPerturbationTableProps } from './ControlPerturbationTableProps';

const ControlPerturbationsTable: React.FC<ControlPerturbationTableProps> = ({
  liveModelServ,
  controlPerturbationsTableServ,
  dataFormatersServ,
  searchAndFilterHelpersServ,
  loadingServ,
  pageStringProviderServ,
  shortcutManagerServ,

  resultsStatusStore,
  controlPerturbationTableStatusStore,
  perturbationFilterSortStore,
  helpHoverStore,
}) => {
  const [activeTab, setActiveTab] = useState<MenuTabTypeCPT>(null);

  /** Trigger which is used to start filtering of perturbations. */
  const [startFilter, setStartFilter] = useState<boolean>(true);
  /** Trigger which is used to start sorting of perturbations. */
  const [startSort, setStartSort] = useState<boolean>(true);

  const [nextPageExists, setNextPageExists] = useState<boolean>(false);

  useEffect(() => {
    shortcutManagerServ?.setShortcuts('Control Perturbations Table');

    return () => {
      shortcutManagerServ?.clearShortcuts();
    };
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <OverviewTabContent
            liveModelServ={liveModelServ}
            controlPerturbationsTableServ={controlPerturbationsTableServ}
            dataFormatersServ={dataFormatersServ}
            resultsStatusStore={resultsStatusStore}
          />
        );
      case 'Filters':
        return (
          <FilterTabContent
            setStartFilter={setStartFilter}
            startFilter={startFilter}
            loadingServ={loadingServ}
            pageStringProviderServ={pageStringProviderServ}
            searchAndFilterHelpersServ={searchAndFilterHelpersServ}
            resultsStatusStore={resultsStatusStore}
            perturbationFilterSortStore={perturbationFilterSortStore}
            helpHoverStore={helpHoverStore}
          />
        );
      case 'Sorting':
        return (
          <SortTabContent
            startSort={startSort}
            setStartSort={setStartSort}
            pageStringProviderServ={pageStringProviderServ}
            perturbationFilterSortStore={perturbationFilterSortStore}
            helpHoverStore={helpHoverStore}
          />
        );
      case 'Pages':
        return (
          <PagesTabContent
            setStartFilter={setStartFilter}
            startFilter={startFilter}
            nextPageExists={nextPageExists}
            pageStringProviderServ={pageStringProviderServ}
            helpHoverStore={helpHoverStore}
            perturbationFilterSortStore={perturbationFilterSortStore}
          />
        );
      case 'Help':
        return <HelpTabContent text={pageStringProviderServ.helpText()} />;
      default:
        return null;
    }
  };

  const commonButtonProps = {
    buttonColor: 'var(--color-primary-buttons)',
    buttonHoverColor: 'var(--color-primary-buttons-hover)',
    buttonActiveColor: 'var(--color-primary-buttons-active)',
    tagTextColor: 'var(--color-primary-text)',
    showTag: true,
  };

  const topMenuButtons: Array<{
    tab: MenuTabTypeCPTNotNull;
    icon: string;
    alt: string;
  }> = [
    { tab: 'Overview', icon: OverviewIcon, alt: 'Overview' },
    { tab: 'Filters', icon: FilterIcon, alt: 'Filters' },
    { tab: 'Sorting', icon: SortingIcon, alt: 'Sorting' },
    { tab: 'Pages', icon: PagesIcon, alt: 'Pages' },
    { tab: 'Help', icon: HelpIcon, alt: 'Help' },
  ];

  const showHideTab = (tabType: MenuTabTypeCPT) => {
    if (activeTab === tabType) {
      setActiveTab(null);
      return;
    }

    setActiveTab(tabType);
  };

  const setTabRef = (tabName: MenuTabTypeCPTNotNull) => (el: any) =>
    controlPerturbationTableStatusStore
      .getState()
      .setMenuTabButtonRef(tabName, el as MenuTabButton);

  return (
    <>
      <TopButtonMenu>
        {topMenuButtons.map((button, index) => (
          <div
            key={button.tab}
            className="overflow-visible max-w-[67px] max-h-67px"
            style={{ zIndex: topMenuButtons.length - index }}
          >
            <IconButtonReact
              {...commonButtonProps}
              isActive={activeTab === button.tab}
              ref={setTabRef(button.tab)}
              onClick={() => showHideTab(button.tab)}
              iconSrc={button.icon}
              iconAlt={button.alt}
              tagText={button.tab}
            />
          </div>
        ))}
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
          controlPerturbationsTableServ={controlPerturbationsTableServ}
          pageStringProviderServ={pageStringProviderServ}
          dataFormatersServ={dataFormatersServ}
          loadingServ={loadingServ}
          resultsStatusStore={resultsStatusStore}
          helpHoverStore={helpHoverStore}
        />
      </div>
    </>
  );
};

export default ControlPerturbationsTable;
