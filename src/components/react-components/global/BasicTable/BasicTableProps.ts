import type { ReactNode } from "react";

export type BasicTableProps<E> = {
  elements: Array<E>;

  containerHeight?: string;
  containerWidth?: string;

  noRowsPlaceholder: string;
  noRowsTextColor: string;
  noRowsHeight?: string;
  noRowsWidth?: string;

  renderRowsWithContainer: (elements: Array<E>) => ReactNode;
};
