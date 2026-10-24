export interface PageSelectorTooltipsInt {
  nextPage(isAvailable: boolean): string;
  previousPage(isAvailable: boolean): string;
  pageIndicator(): string;
}
