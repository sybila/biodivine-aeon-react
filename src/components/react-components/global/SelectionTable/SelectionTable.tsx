import { useMemo, useState, type ReactElement } from 'react';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import TextInputReact from '../../lit-wrappers/TextInputReact';
import SelectionButtons from '../SelectionButtons/SelectionButtons';
import type { SelectionTableProps } from './SelectionTableProps';

function SelectionTable<T extends string | number, E>({
  elements,
  getIdFromElement,
  selectedElementIds,
  setSelectedElementIds,

  noRowsPlaceholder,
  noRowsTextColor,

  getSearchText,
  setSearchText,
  searchPlaceholder,
  filterElements,
  textInputTextColor,
  textInputColor,
  textInputBorderColor,

  renderRow,

  selectionButtonTooltips,

  helpHoverStore,
}: SelectionTableProps<T, E>): ReactElement {
  const [componentSearchText, setComponentSearchText] =
    useState<string>(getSearchText());

  const setSearch = (name: string) => {
    if (name !== componentSearchText) {
      setSearchText(name);
      setComponentSearchText(name);
    }
  };

  const elementIds = useMemo(() => {
    return elements.map((el) => getIdFromElement(el));
  }, [elements, getIdFromElement]);

  const filteredElements = useMemo(() => {
    return filterElements(elements, componentSearchText);
  }, [elements, filterElements]);

  return (
    <section className="flex flex-col items-center w-full h-fit gap-1 mb-3">
      <TextInputReact
        textColor={textInputTextColor}
        inputColor={textInputColor}
        inputBorderColor={textInputBorderColor}
        compWidth="95%"
        placeholder={searchPlaceholder}
        onWrite={setSearch}
        value={componentSearchText}
      />

      <section className="flex flex-row justify-between items-center h-[50px] w-[94%]">
        {/* <div className="flex flex-row gap-2 h-full max-w-[50%] items-center justify-start">
          {statusButtons.map(
            ([label, color, hoverColor, onClick, onMouseEnter], index) => (
              <TextButtonReact
                textColor="var(--color-secondary-text)"
                key={index}
                compHeight="29px"
                compWidth="29px"
                text={label}
                handleClick={onClick}
                buttonColor={color}
                buttonHoverColor={hoverColor}
                onMouseEnter={onMouseEnter}
                onMouseLeave={() => helpHoverStore.getState().clear()}
              />
            )
          )}
        </div> */}
        <SelectionButtons<T>
          keys={elementIds}
          selectedVariables={selectedElementIds}
          setSelectedVariables={(newSelected) =>
            setSelectedElementIds(newSelected)
          }
          tooltips={selectionButtonTooltips}
          helpHoverStore={helpHoverStore}
        />
      </section>

      {!filteredElements || filteredElements.length === 0 ? (
        <section className="flex h-[200px] w-[98%] justify-center items-center">
          <SimpleHeaderReact
            textColor={noRowsTextColor}
            headerText={noRowsPlaceholder}
            textFontWeight="normal"
          />
        </section>
      ) : (
        <section className="flex flex-col min-h-[50px] h-auto max-h-[152px] md:max-h-[252px] xl:max-h-[352px] 2xl:max-h-[452px] overflow-auto w-[98%] px-[2%] pb-1 mb-1 gap-1">
          {filteredElements.map((el: E) => renderRow(el))}
        </section>
      )}
    </section>
  );
}

export default SelectionTable;
