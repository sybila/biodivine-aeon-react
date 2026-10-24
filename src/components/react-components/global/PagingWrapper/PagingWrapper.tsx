import { useEffect, useState, type ReactElement } from 'react';
import PageSelectorReact from '../../lit-wrappers/PageSelectorReact';
import type { PagingWrapperProps } from './PagingWrapperProps';

function PagingWrapper<Element>({
  elements,
  initialPageNumber = 1,

  wrapperHeight = 'fit-content',
  wrapperWidth = 'fit-content',
  contentPagingGap = '5px',

  numberOfElementsOnPage = 10,

  setElementsOnPage,

  children,

  tooltipStringsServ,

  helpHoverStore,
}: PagingWrapperProps<Element>): ReactElement {
  const [currentPage, setCurrentPage] = useState<number>(initialPageNumber);

  const nextPageExists =
    elements.length - currentPage * numberOfElementsOnPage > 0;

  useEffect(() => {
    const firstElementIndex = (currentPage - 1) * numberOfElementsOnPage;
    const lastElementIndex = Math.min(
      firstElementIndex + numberOfElementsOnPage,
      elements.length
    );

    setElementsOnPage(elements.slice(firstElementIndex, lastElementIndex));
  }, [elements, currentPage]);

  return (
    <div
      className="flex flex-col items-center"
      style={{
        height: wrapperHeight,
        width: wrapperWidth,
        gap: contentPagingGap,
      }}
    >
      {children}

      <PageSelectorReact
        compWidth="100%"
        contWidth="100%"
        centerMinWidth="50%"
        initialPage={currentPage}
        buttonColor="var(--color-secondary-buttons)"
        buttonHoverColor="var(--color-secondary-buttons-hover)"
        buttonDisabledColor="var(--color-secondary-buttons-disabled)"
        centerColor="var(--color-secondary-light)"
        nextPageExists={nextPageExists}
        handlePageChange={(newPage: number) => {
          setCurrentPage(newPage);
        }}
        leftButtonOnMouseEnter={(e: MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e,
              tooltipStringsServ.previousPage(currentPage > 1),
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
              tooltipStringsServ.nextPage(nextPageExists),
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
              tooltipStringsServ.pageIndicator(),
              true,
              -50
            )
        }
        centerIndicatorOnMouseLeave={() => helpHoverStore.getState().clear()}
      />
    </div>
  );
}

export default PagingWrapper;
