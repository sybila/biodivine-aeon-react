import type { ReactNode } from 'react';
import type { SelectionButtonsTooltipsInt } from '../../../../services/global/StringProvider/common-tooltips/SelectionButtonsTooltipsInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type SelectionTableProps<T extends string | number, E> = {
  elements: Array<E>;
  getIdFromElement: (el: E) => T;
  selectedElementIds: Set<T>;
  setSelectedElementIds: (newSelected: Set<T>) => void;

  noRowsPlaceholder: string;
  noRowsTextColor: string;

  getSearchText: () => string;
  setSearchText: (text: string) => void;
  searchPlaceholder: string;
  filterElements: (elements: Array<E>, searchTerm: string) => Array<E>;
  textInputTextColor: string;
  textInputColor: string;
  textInputBorderColor: string;

  renderRow: (el: E) => ReactNode;

  selectionButtonTooltips: SelectionButtonsTooltipsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
