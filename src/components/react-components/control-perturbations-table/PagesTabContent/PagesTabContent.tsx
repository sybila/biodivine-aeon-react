import PageSelectorReact from '../../lit-wrappers/PageSelectorReact';
import usePerturbationFilterSortStore from '../../../../stores/ControlPerturbationsTable/usePerturbationsFilterSortStore';

const PagesTabContent: React.FC<{
  setStartFilter: (value: boolean) => void;
  startFilter: boolean;
  nextPageExists: boolean;
}> = ({ setStartFilter, startFilter, nextPageExists }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-2 pt-2 pb-2">
      <PageSelectorReact
        compWidth="100%"
        contWidth="100%"
        centerMinWidth="50%"
        initialPage={usePerturbationFilterSortStore.getState().pageNumber}
        nextPageExists={nextPageExists}
        handlePageChange={(newPage: number) => {
          usePerturbationFilterSortStore.getState().setPageNumber(newPage);
          setStartFilter(!startFilter);
        }}
      />
    </div>
  );
};

export default PagesTabContent;
