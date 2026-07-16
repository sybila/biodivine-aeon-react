import SeparatorLine from '../../global/SeparatorLine/SeparatorLine';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import SortButtonSection from './SortButtonSection/SortButtonSection';
import type { SortTabContentProps } from './SortTabContentProps';

const SortTabContent: React.FC<SortTabContentProps> = ({
  startSort,
  setStartSort,
  pageStringProviderServ,
  perturbationFilterSortStore,
  helpHoverStore,
}) => {
  const filtersAndSorts = perturbationFilterSortStore((state) => state);
  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-2 pt-2 pb-2">
      <SeparatorLine />
      <DotHeaderReact
        compWidth="100%"
        justifyHeader="start"
        headerText="Primary Sort"
        textColor="var(--color-primary-text)"
      />

      <SortButtonSection
        sortDirection={filtersAndSorts.primarySort?.direction || 'asc'}
        sortField={filtersAndSorts.primarySort?.field || 'id'}
        setFunction={(value) => {
          filtersAndSorts.setPrimarySort(value);
        }}
        disable={false}
        pageStringProviderServ={pageStringProviderServ}
        helpHoverStore={helpHoverStore}
      />

      <SeparatorLine />
      <DotHeaderReact
        compWidth="100%"
        justifyHeader="start"
        headerText="Secondary Sort"
        textColor="var(--color-primary-text)"
      />

      <SortButtonSection
        sortDirection={filtersAndSorts.secondarySort?.direction || 'asc'}
        sortField={filtersAndSorts.secondarySort?.field || 'id'}
        setFunction={(value) => {
          filtersAndSorts.setSecondarySort(value);
        }}
        disable={
          !filtersAndSorts.primarySort ||
          filtersAndSorts.primarySort?.field === 'id' ||
          filtersAndSorts.secondarySort?.field ===
            filtersAndSorts.primarySort?.field
        }
        pageStringProviderServ={pageStringProviderServ}
        helpHoverStore={helpHoverStore}
      />

      <SeparatorLine />
      <TextButtonReact
        compWidth="99%"
        compHeight="40px"
        textFontWeight="bold"
        text="Apply Sorts"
        textColor="var(--color-secondary-text)"
        buttonColor="var(--color-secondary-buttons)"
        buttonHoverColor="var(--color-secondary-buttons-hover)"
        onClick={() => {
          setStartSort(!startSort);
        }}
        onMouseEnter={(e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.applySorts(),
              true,
              -50
            )
        }
        onMouseLeave={() => helpHoverStore.getState().clear()}
      />
    </div>
  );
};

export default SortTabContent;
