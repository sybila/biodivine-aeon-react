import type { ReactElement } from 'react';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import type { BasicTableProps } from './BasicTableProps';

function BasicTable<E>({
  elements,
  containerHeight = 'fit',
  containerWidth = '100%',

  noRowsPlaceholder,
  noRowsTextColor,
  noRowsHeight = '100px',
  noRowsWidth = '98%',

  renderRowsWithContainer,
}: BasicTableProps<E>): ReactElement {
  return (
    <section
      className="flex flex-col items-center gap-1"
      style={{ height: containerHeight, width: containerWidth }}
    >
      {!elements || elements.length === 0 ? (
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
        renderRowsWithContainer(elements)
      )}
    </section>
  );
}

export default BasicTable;
