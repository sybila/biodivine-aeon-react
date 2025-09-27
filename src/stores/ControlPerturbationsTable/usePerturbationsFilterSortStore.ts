import { create } from 'zustand';
import type { PertTableSort, PertVariableFilterStatus } from '../../types';

type PerturbationFiltersSortState = {
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

const usePerturbationFilterSortStore = create<PerturbationFiltersSortState>(
  (set) => ({
    pageNumber: 1,
    perturbationVariables: {},
    minRobustness: undefined,
    maxSize: undefined,
    minNumberOfInterpretations: undefined,
    primarySort: undefined,
    secondarySort: undefined,

    setPageNumber: (page: number) => set({ pageNumber: page }),
    setPerturbationVariables: (
      vars: Record<string, PertVariableFilterStatus>
    ) => set({ perturbationVariables: vars, pageNumber: 1 }),
    setMinRobustness: (value: number | undefined) =>
      set({ minRobustness: value, pageNumber: 1 }),
    setMaxSize: (value: number | undefined) =>
      set({ maxSize: value, pageNumber: 1 }),
    setMinNumberOfInterpretations: (value: number | undefined) =>
      set({ minNumberOfInterpretations: value, pageNumber: 1 }),
    setPrimarySort: (sort: PertTableSort | undefined) =>
      set({ primarySort: sort, pageNumber: 1 }),
    setSecondarySort: (sort: PertTableSort | undefined) =>
      set({ secondarySort: sort, pageNumber: 1 }),
    clear: () => {
      set({
        pageNumber: 1,
        perturbationVariables: {},
        minRobustness: undefined,
        maxSize: undefined,
        minNumberOfInterpretations: undefined,
        primarySort: undefined,
        secondarySort: undefined,
      });
    },
  })
);

export default usePerturbationFilterSortStore;
