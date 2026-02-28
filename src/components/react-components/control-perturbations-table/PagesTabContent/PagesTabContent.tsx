import PageSelectorReact from '../../lit-wrappers/PageSelectorReact';
import type { PagesTabContentProps } from './PagesTabContentProps';

const PagesTabContent: React.FC<PagesTabContentProps> = ({
  setStartFilter,
  startFilter,
  nextPageExists,
  perturbationFilterSortStore,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-2 pt-2 pb-2">
      <PageSelectorReact
        compWidth="100%"
        contWidth="100%"
        centerMinWidth="50%"
        initialPage={perturbationFilterSortStore.getState().pageNumber}
        nextPageExists={nextPageExists}
        handlePageChange={(newPage: number) => {
          perturbationFilterSortStore.getState().setPageNumber(newPage);
          setStartFilter(!startFilter);
        }}
      />
    </div>
  );
};

export default PagesTabContent;
