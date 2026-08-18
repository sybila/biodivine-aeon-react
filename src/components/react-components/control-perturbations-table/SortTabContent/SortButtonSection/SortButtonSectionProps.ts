import type { ControlPerturbationTablePageStringsInt } from '../../../../../services/global/StringProvider/ControlPerturbationTablePageStrings/ControlPerturbationTablePageStringsInt';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';
import type {
  PertTableSort,
  PerturbationSortFields,
  SortDirection,
} from '../../../../../types/types';

export type SortButtonSectionProps = {
  sortDirection: SortDirection;
  sortField: PerturbationSortFields;
  setFunction: (value: PertTableSort | undefined) => void;
  disable: boolean;

  pageStringProviderServ: ControlPerturbationTablePageStringsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
