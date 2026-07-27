import type { ReactNode } from 'react';

export type SearchTableProps<E> = {
  elements: Array<E>;

  noRowsPlaceholder: string;
  noRowsTextColor: string;
  noRowsHeight: string;
  noRowsWidth: string;

  getSearchText: () => string;
  setSearchText: (text: string) => void;
  searchPlaceholder: string;
  filterElements: (elements: Array<E>, searchTerm: string) => Array<E>;
  textInputTextColor: string;
  textInputColor: string;
  textInputBorderColor: string;

  renderRowsWithContainer: (elements: Array<E>) => ReactNode;
};
