import usePerturbationFilterSortStore from '../../../../stores/ControlPerturbationsTable/usePerturbationsFilterSortStore';
import SeparatorLine from '../../global/SeparatorLine/SeparatorLine';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import SortButtonSection from './SortButtonSection/SortButtonSection';

const SortTabContent: React.FC<{
  startSort: boolean;
  setStartSort: (value: boolean) => void;
}> = ({ startSort, setStartSort }) => {
  const filtersAndSorts = usePerturbationFilterSortStore((state) => state);
  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-2 pt-2 pb-2">
      <SeparatorLine />
      <DotHeaderReact
        compWidth="100%"
        justifyHeader="start"
        headerText="Primary Sort"
      />

      <SortButtonSection
        sortDirection={filtersAndSorts.primarySort?.direction || 'desc'}
        sortField={filtersAndSorts.primarySort?.field || 'id'}
        setFunction={(value) => {
          filtersAndSorts.setPrimarySort(value);
        }}
        disable={false}
      />

      <SeparatorLine />
      <DotHeaderReact
        compWidth="100%"
        justifyHeader="start"
        headerText="Secondary Sort"
      />

      <SortButtonSection
        sortDirection={filtersAndSorts.secondarySort?.direction || 'desc'}
        sortField={filtersAndSorts.secondarySort?.field || 'id'}
        setFunction={(value) => {
          filtersAndSorts.setSecondarySort(value);
        }}
        disable={
          filtersAndSorts.secondarySort?.field ===
            filtersAndSorts.primarySort?.field ||
          (!filtersAndSorts.secondarySort &&
            filtersAndSorts.primarySort?.field === 'id') ||
          (!filtersAndSorts.primarySort &&
            filtersAndSorts.secondarySort?.field === 'id')
        }
      />

      <SeparatorLine />
      <TextButtonReact
        compWidth="99%"
        compHeight="40px"
        textFontWeight="bold"
        text="Apply Sorts"
        onClick={() => {
          setStartSort(!startSort);
        }}
      />
    </div>
  );
};

export default SortTabContent;
