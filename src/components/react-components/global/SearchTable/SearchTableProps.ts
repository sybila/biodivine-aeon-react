import type { ReactNode } from 'react';
import type { SelectionButtonsTooltipsInt } from '../../../../services/global/StringProvider/common-tooltips/SelectionButtonsTooltipsInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type SearchTableProps<E, ID extends string | number = number> = {
  elements: Array<E>;

  containerHeight?: string;
  containerWidth?: string;

  noRowsPlaceholder: string;
  noRowsTextColor: string;
  noRowsHeight?: string;
  noRowsWidth?: string;

  getSearchText: () => string;
  setSearchText: (text: string) => void;
  searchPlaceholder: string;
  filterElements: (elements: Array<E>, searchTerm: string) => Array<E>;
  textInputTextColor: string;
  textInputColor: string;
  textInputBorderColor: string;

  renderRowsWithContainer: (elements: Array<E>) => ReactNode;

  buttons?: Array<{
    text: string;
    handleClick: () => void;
    buttonBgColor: string;
    buttonHoverColor: string;
    buttonTooltipFunction: (e: MouseEvent) => void;
  }>;

  buttonSectionHeight?: string;
  buttonHeight?: string;
  buttonWidth?: string;

  selectionButtonsConfig?: {
    buttonSize?: string;
    buttonColor: string;
    buttonHoverColor: string;
    selectedElementsIds: Set<ID>;
    setSelectedElements: (newSelected: Set<ID>) => void;
    allElementIds: ID[];
    selectionButtonsTooltips: SelectionButtonsTooltipsInt;
    helpHoverStore: ZustandStore<HelpHoverState>;
  };

  hideTooltipFunction: () => void;
};
