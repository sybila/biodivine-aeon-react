import { useMemo, useState, type ReactElement } from 'react';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import TextInputReact from '../../lit-wrappers/TextInputReact';
import type { SearchTableProps } from './SearchTableProps';

function SearchTable<E>({
  elements,

  containerHeight = 'fit',
  containerWidth = '100%',

  noRowsPlaceholder,
  noRowsTextColor,
  noRowsHeight = "100px",
  noRowsWidth = "98%",

  getSearchText,
  setSearchText,
  searchPlaceholder,
  filterElements,
  textInputTextColor,
  textInputColor,
  textInputBorderColor,

  renderRowsWithContainer,
}: SearchTableProps<E>): ReactElement {
  const [componentSearchText, setComponentSearchText] =
    useState<string>(getSearchText());

  const setSearch = (name: string) => {
    if (name !== componentSearchText) {
      setSearchText(name);
      setComponentSearchText(name);
    }
  };

  const filteredElements = useMemo(() => {
    return filterElements(elements, componentSearchText);
  }, [elements, componentSearchText, filterElements]);

  return (
    <section
      className="flex flex-col items-center gap-1"
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

      {!filteredElements || filteredElements.length === 0 ? (
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
        renderRowsWithContainer(filteredElements)
      )}
    </section>
  );
}

export default SearchTable;
