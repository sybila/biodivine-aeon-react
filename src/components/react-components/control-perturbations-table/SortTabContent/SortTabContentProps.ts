import type { ControlPerturbationTablePageStringsInt } from '../../../../services/global/StringProvider/ControlPerturbationTablePageStrings/ControlPerturbationTablePageStringsInt';
import type { PerturbationFiltersSortState } from '../../../../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/PerturbationsFilterSortState';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type SortTabContentProps = {
  startSort: boolean;
  setStartSort: (value: boolean) => void;

  pageStringProviderServ: ControlPerturbationTablePageStringsInt;

  perturbationFilterSortStore: ZustandStore<PerturbationFiltersSortState>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
