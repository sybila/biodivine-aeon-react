import type {
  PertTableSort,
  PerturbationSortFields,
  SortDirection,
} from '../../../../../types';

export type SortButtonSectionProps = {
  sortDirection: SortDirection;
  sortField: PerturbationSortFields;
  setFunction: (value: PertTableSort | undefined) => void;
  disable: boolean;
};
