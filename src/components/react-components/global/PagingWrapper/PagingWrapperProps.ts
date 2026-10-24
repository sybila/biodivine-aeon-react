import type { PageSelectorTooltipsInt } from '../../../../services/global/StringProvider/common-tooltips/PageSelectorTooltips/PageSelectorTooltipsInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type PagingWrapperProps<Element> = {
  elements: Array<Element>;
  initialPageNumber?: number;

  wrapperHeight?: string;
  wrapperWidth?: string;
  contentPagingGap?: string;

  numberOfElementsOnPage?: number;

  setElementsOnPage: (pageOfElements: Array<Element>) => void;

  children?: React.ReactNode;

  tooltipStringsServ: PageSelectorTooltipsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
