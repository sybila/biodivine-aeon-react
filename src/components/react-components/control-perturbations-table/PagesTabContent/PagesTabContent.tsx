import PageSelectorReact from '../../lit-wrappers/PageSelectorReact';
import type { PagesTabContentProps } from './PagesTabContentProps';

const PagesTabContent: React.FC<PagesTabContentProps> = ({
  setStartFilter,
  startFilter,
  nextPageExists,

  pageStringProviderServ,

  perturbationFilterSortStore,
  helpHoverStore,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-2 pt-2 pb-2">
      <PageSelectorReact
        compWidth="100%"
        contWidth="100%"
        centerMinWidth="50%"
        initialPage={perturbationFilterSortStore.getState().pageNumber}
        buttonColor='var(--color-secondary-buttons)'
        buttonHoverColor='var(--color-secondary-buttons-hover)'
        buttonDisabledColor='var(--color-secondary-buttons-disabled)'
        centerColor='var(--color-secondary-light)'
        nextPageExists={nextPageExists}
        handlePageChange={(newPage: number) => {
          perturbationFilterSortStore.getState().setPageNumber(newPage);
          setStartFilter(!startFilter);
        }}
        leftButtonOnMouseEnter={(e: MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e,
              pageStringProviderServ.Tooltips.previousPage(
                perturbationFilterSortStore.getState().pageNumber > 1
              ),
              true,
              -50
            )
        }
        leftButtonOnMouseLeave={() => helpHoverStore.getState().clear()}
        rightButtonOnMouseEnter={(e: MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e,
              pageStringProviderServ.Tooltips.nextPage(nextPageExists),
              true,
              -50
            )
        }
        rightButtonOnMouseLeave={() => helpHoverStore.getState().clear()}
        centerIndicatorOnMouseEnter={(e: MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e,
              pageStringProviderServ.Tooltips.pageIndicator(),
              true,
              -50
            )
        }
        centerIndicatorOnMouseLeave={() => helpHoverStore.getState().clear()}
      />
    </div>
  );
};

export default PagesTabContent;
