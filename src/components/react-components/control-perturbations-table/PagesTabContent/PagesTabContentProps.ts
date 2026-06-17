import type { ControlPerturbationTablePageStringsInt } from '../../../../services/global/StringProvider/ControlPerturbationTablePageStrings/ControlPerturbationTablePageStringsInt';
import type { PerturbationFiltersSortState } from '../../../../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/PerturbationsFilterSortState';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';

export type PagesTabContentProps = {
  setStartFilter: (value: boolean) => void;
  startFilter: boolean;
  nextPageExists: boolean;

  pageStringProviderServ: ControlPerturbationTablePageStringsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
  perturbationFilterSortStore: ZustandStore<PerturbationFiltersSortState>;
};
