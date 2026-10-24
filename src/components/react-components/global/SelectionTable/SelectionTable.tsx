import { useMemo, useState, type ReactElement } from 'react';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import TextInputReact from '../../lit-wrappers/TextInputReact';
import PagingWrapper from '../PagingWrapper/PagingWrapper';
import SelectionButtons from '../SelectionButtons/SelectionButtons';
import type { SelectionTableProps } from './SelectionTableProps';

function SelectionTable<ID extends string | number, Element>({
  elements,

  containerHeight = 'fit',
  containerWidth = '100%',

  noRowsPlaceholder,
  noRowsTextColor,
  noRowsHeight = '100px',
  noRowsWidth = '98%',

  getSearchText,
  setSearchText,
  searchPlaceholder,
  filterElements,
  textInputTextColor,
  textInputColor,
  textInputBorderColor,

  buttons = [],
  buttonSectionHeight = '50px',
  buttonHeight = '29px',
  buttonWidth = '29px',

  selectionButtonsConfig = undefined,

  pagingWrapperConfig = undefined,

  renderRowsWithContainer,

  hideTooltipFunction,
}: SelectionTableProps<ID, Element>): ReactElement {
  const [componentSearchText, setComponentSearchText] =
    useState<string>(getSearchText());
  const [elementsOnPage, setElementsOnPage] = useState<Array<Element>>([]);

  const setSearch = (name: string) => {
    if (name !== componentSearchText) {
      setSearchText(name);
      setComponentSearchText(name);
    }
  };

  const filteredElements = useMemo(() => {
    return filterElements(elements, componentSearchText);
  }, [elements, filterElements]);

  const renderPagingWrapper = (children: React.ReactNode) => {
    if (pagingWrapperConfig == undefined) {
      return children;
    }

    return (
      <PagingWrapper
        wrapperHeight={pagingWrapperConfig.pagingWrapperHeight ?? 'fit-content'}
        wrapperWidth={pagingWrapperConfig.pagingWrapperWidth ?? '100%'}
        elements={filteredElements}
        numberOfElementsOnPage={pagingWrapperConfig.numberOfElementsOnPage ?? undefined}
        setElementsOnPage={(elements) => setElementsOnPage(elements)}
        tooltipStringsServ={pagingWrapperConfig.pagingWrapperTooltips}
        helpHoverStore={pagingWrapperConfig.helpHoverStore}
      >
        {children}
      </PagingWrapper>
    );
  };

  return (
    <section
      className="flex flex-col items-center  gap-1 mb-3"
      style={{ height: containerHeight, width: containerWidth }}
    >
      <TextInputReact
        textColor={textInputTextColor}
        inputColor={textInputColor}
        inputBorderColor={textInputBorderColor}
        compWidth="95%"
        placeholder={searchPlaceholder}
        onWrite={setSearch}
        value={componentSearchText}
      />

      {(buttons && buttons.length > 0) ||
      selectionButtonsConfig != undefined ? (
        <section
          className="flex items-center justify-between w-[95%] overflow-y-visible overflow-x-hidden px-1"
          style={{ height: buttonSectionHeight }}
        >
          {buttons && buttons.length > 0 ? (
            <div className="flex flex-row gap-2 h-full max-w-[50%] items-center justify-start ">
              {buttons.map((button, index) => (
                <TextButtonReact
                  key={index}
                  text={button.text}
                  buttonColor={button.buttonBgColor}
                  buttonHoverColor={button.buttonHoverColor}
                  handleClick={() => button.handleClick()}
                  compHeight={buttonHeight}
                  compWidth={buttonWidth}
                  onMouseEnter={(e: React.MouseEvent) =>
                    button.buttonTooltipFunction(e.nativeEvent)
                  }
                  onMouseLeave={() => hideTooltipFunction()}
                />
              ))}
            </div>
          ) : null}

          {selectionButtonsConfig != undefined ? (
            <SelectionButtons<ID>
              buttonSize={selectionButtonsConfig.buttonSize ?? buttonHeight}
              buttonColor={selectionButtonsConfig.buttonColor}
              buttonHoverColor={selectionButtonsConfig.buttonHoverColor}
              keys={selectionButtonsConfig.allElementIds}
              selectedVariables={selectionButtonsConfig.selectedElementsIds}
              setSelectedVariables={(selected: Set<ID>) => {
                selectionButtonsConfig.setSelectedElements(selected);
              }}
              tooltips={selectionButtonsConfig.selectionButtonsTooltips}
              helpHoverStore={selectionButtonsConfig.helpHoverStore}
            />
          ) : null}
        </section>
      ) : null}

      {renderPagingWrapper(
        (pagingWrapperConfig != undefined && elementsOnPage.length < 1) ||
          (pagingWrapperConfig == undefined &&
            (!filteredElements || filteredElements.length < 1)) ? (
          <section
            className="flex justify-center items-center"
            style={{ height: noRowsHeight, width: noRowsWidth }}
          >
            <SimpleHeaderReact
              textColor={noRowsTextColor}
              headerText={noRowsPlaceholder}
              textFontWeight="normal"
            />
          </section>
        ) : (
          renderRowsWithContainer(
            pagingWrapperConfig != undefined ? elementsOnPage : filteredElements
          )
        )
      )}
    </section>
  );
}

export default SelectionTable;
