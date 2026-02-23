import type { PertTableSort, PertVariableFilterStatus } from '../../../types';

export type PerturbationFiltersSortState = {
  pageNumber: number;
  perturbationVariables: Record<string, PertVariableFilterStatus>;
  minRobustness: number | undefined;
  maxSize: number | undefined;
  minNumberOfInterpretations: number | undefined;
  primarySort: PertTableSort | undefined;
  secondarySort: PertTableSort | undefined;
  setPageNumber: (page: number) => void;
  setPerturbationVariables: (
    vars: Record<string, PertVariableFilterStatus>
  ) => void;
  setMinRobustness: (value: number | undefined) => void;
  setMaxSize: (value: number | undefined) => void;
  setMinNumberOfInterpretations: (value: number | undefined) => void;
  setPrimarySort: (sort: PertTableSort | undefined) => void;
  setSecondarySort: (sort: PertTableSort | undefined) => void;
  clear: () => void;
};
