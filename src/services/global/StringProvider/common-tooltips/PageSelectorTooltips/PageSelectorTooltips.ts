import type { Constructor } from '../../../../../types/mixins';
import type { PageSelectorTooltipsInt } from './PageSelectorTooltipsInt';

function PageSelectorTooltips<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements PageSelectorTooltipsInt {
    nextPage(isAvailable: boolean): string {
      return isAvailable ? 'Go to next page.' : 'Next page not available.';
    }
    previousPage(isAvailable: boolean): string {
      return isAvailable
        ? 'Go to previous page.'
        : 'Previous page not available.';
    }
    pageIndicator(): string {
      return 'Current page.';
    }
  };
}

export default PageSelectorTooltips;
